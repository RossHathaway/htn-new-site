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

// {
//     content: 'Our first goal has almost been achieved! It is only by all of your heartfelt help that we have come this far. We are so close to the top of the mountain. But this last $9,000 is weighing heavily on our shoulders.\n' +
//       '\n' +
//       '**PLEASE HELP TO LIGHTEN OUR LOAD  \n' +
//       ' IN THE LAST STRETCH UP THE MOUNTAIN!**\n' +
//       '\n' +
//       '**![](/media/sittingonmountain.jpg)**',
//     data: {
//       date: 2013-01-22T23:53:36.000Z,
//       title: 'We Need Your Help!',
//       subtitle: '',
//       description: 'Our request to you...',
//       author: 'HTN Staff'
//     },
//     isEmpty: false,
//     excerpt: ''
//   } <p>Our first goal has almost been achieved! It is only by all of your heartfelt help that we have come this far. We are so close to the top of the mountain. But this last $9,000 is weighing heavily on our shoulders.</p>
//   <p><strong>PLEASE HELP TO LIGHTEN OUR LOAD<br>
//   IN THE LAST STRETCH UP THE MOUNTAIN!</strong></p>
//   <p><strong><img src="/media/sittingonmountain.jpg" alt=""></strong></p>
