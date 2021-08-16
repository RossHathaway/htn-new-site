const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const md = require('markdown-it')({ html: true })
const ejs = require('ejs')

const posts = []

// For all posts
const templateFile = fs.readFileSync(path.join(__dirname, 'templates/blog.html'), 'utf-8')

const template = ejs.compile(templateFile, {
    cache: true,
    filename: 'blog.html',
});

const blogFileNames = fs.readdirSync(path.join(__dirname, '/blog'))

for (let fileName of blogFileNames) {
    const postMarkdown = fs.readFileSync(path.join(__dirname, 'blog', fileName), 'utf-8')

    const frontmatterSplitPost = matter(postMarkdown)

    const postHtml = md.render(frontmatterSplitPost.content)

    const output = template({ ...frontmatterSplitPost.data, postHtml })

    fs.writeFileSync(`dist/blog/${fileName.split('.')[0]}.html`, output)

    posts.push({ ...frontmatterSplitPost.data, fileName })
}

// For blog homepage
ejs.renderFile(
    path.join(__dirname, 'templates/blog-home.html'),
    { posts },
    { cache: true, fileName: 'blog.html' },
    (err, result) => {
        if (err) {
            throw new Error(err)
        }
        fs.writeFileSync('dist/blog/index.html', result)
    }
)