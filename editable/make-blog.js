const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const md = require('markdown-it')()
const ejs = require('ejs')

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

    // pass both to ejs
    const output = template({ ...frontmatterSplitPost.data, postHtml })
    console.log(output)
}
