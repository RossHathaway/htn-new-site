const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const md = require('markdown-it')()

const blogFileNames = fs.readdirSync(path.join(__dirname, '/blog'))
// for each file

for (let fileName of blogFileNames) {
    const postMarkdown = fs.readFileSync(path.join(__dirname, 'blog', fileName), 'utf-8')
    const frontmatterSplitPost = matter(postMarkdown)
    const postHtml = md.render(frontmatterSplitPost.content)

    // pass both to ejs
}