const fs = require('fs')
const read = require('recursive-readdir')
const path = require('path')
const Image = require('@11ty/eleventy-img')

function ignoreFunc(file, stats) {
    return stats.isDirectory()
}

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
        widths: [1000, 500, 300, null],
        // widths,
        filenameFormat: function (id, src, width, format) {
            const extension = path.extname(src)
            const name = path.basename(src, extension)

            return `${name}-${width}w.${format}`
        },
        outputDir: 'dist/media',
        urlPath: '/media/',
    })

    let imageAttributes = {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async',
    }

    return Image.generateHTML(metadata, imageAttributes, {
        whitespaceMode: 'inline',
    })
}

// read('/media', [], ignoreFunc, async function (err, files) {
//     if (err) {
//         throw err
//     }
//     for (const file of files) {
//     }
// })

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/css')
    eleventyConfig.addPassthroughCopy('src/js')
    eleventyConfig.addPassthroughCopy('src/slick')
    eleventyConfig.addPassthroughCopy('src/webfonts')
    // eleventyConfig.addPassthroughCopy('src/media')
    eleventyConfig.addPassthroughCopy('src/js')

    eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode)
    eleventyConfig.addLiquidShortcode('image', imageShortcode)
    eleventyConfig.addJavaScriptFunction('image', imageShortcode)

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
