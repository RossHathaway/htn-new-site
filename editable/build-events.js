const fs = require('fs')
const path = require('path')
const md = require('markdown-it')()
const ejs = require('ejs')

const postMarkdown = fs.readFileSync(path.join(__dirname, 'events.md'), 'utf-8')

const eventsInfoHtml = md.render(postMarkdown)

ejs.renderFile(
    path.join(__dirname, 'templates/events.html'),
    { eventsInfoHtml },
    { cache: true, fileName: 'events.html' },
    (err, result) => {
        if (err) {
            throw new Error(err)
        }
        fs.writeFileSync('dist/news/events.html', result)
    }
)