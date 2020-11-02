const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const blogFileNames = fs.readdirSync(path.join(__dirname, '/blog'))

// for each file
for (let fileName of blogFileNames) {
    // read file sync
    const postMarkdown = fs.readFileSync(path.join(__dirname, 'blog', fileName), 'utf-8')
    console.log(postMarkdown)
    // pass to gray matter
    // pass that to markdown-it
    // pass both to ejs
}