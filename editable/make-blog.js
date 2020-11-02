const fs = require('fs')
const path = require('path')

// read editable/templates/blog
const blogFileNames = fs.readdirSync(path.join(__dirname, '/blog'))

console.log(blogFileNames)

// for each file
// pass to gray matter
// pass that to markdown-it
// pass both to ejs