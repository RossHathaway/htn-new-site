const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const blogFileNames = fs.readdirSync(path.join(__dirname, '/blog'))

// for each file
for (let fileName of blogFileNames) {
    const postMarkdown = fs.readFileSync(path.join(__dirname, 'blog', fileName), 'utf-8')
    const frontmatterSplitPost = matter(postMarkdown)

    console.log(frontmatterSplitPost)
    // pass that to markdown-it
    // pass both to ejs
}