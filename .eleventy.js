const fs = require('fs')
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/css')
    eleventyConfig.addPassthroughCopy('src/js')
    eleventyConfig.addPassthroughCopy('src/slick')
    eleventyConfig.addPassthroughCopy('src/webfonts')
    eleventyConfig.addPassthroughCopy('src/media')
    eleventyConfig.addPassthroughCopy('src/js')

    eleventyConfig.addFilter('dateFilter', (date) =>
        new Date(date).toDateString().slice(4)
    )

    eleventyConfig.addCollection('blog', (collection) => {
        return collection
            .getFilteredByGlob('./src/blog/*.md')
            .sort((first, second) =>
                first.data.date < second.data.date ? 1 : -1
            )
    })

    // 404 not working
    // eleventyConfig.setBrowserSyncConfig({
    //     callbacks: {
    //         ready: function (err, bs) {
    //             bs.addMiddleware('*', (req, res) => {
    //                 const content_404 = fs.readFileSync('dist/404.html')
    //                 console.log('404 -------', content_404)
    //                 // Add 404 http status code in request header.
    //                 res.writeHead(404, {
    //                     'Content-Type': 'text/html; charset=UTF-8',
    //                 })
    //                 // Provides the 404 content without redirect.
    //                 res.write(content_404)
    //                 res.end()
    //             })
    //         },
    //     },
    // })

    return {
        passthroughFileCopy: true,
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'dist',
        },
    }
}
