module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/css')
    eleventyConfig.addPassthroughCopy('src/js')
    eleventyConfig.addPassthroughCopy('src/slick')
    eleventyConfig.addPassthroughCopy('src/webfonts')
    eleventyConfig.addPassthroughCopy('src/media')
    eleventyConfig.addPassthroughCopy('src/js')

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
