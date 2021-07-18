const fs = require('fs')
const rw = require('rw-stream')

const files = fs.readdirSync('./dist')

const htmlFiles = files.filter((file) => file.endsWith('.html'))

for (const file of htmlFiles) {
    console.log('file', file)

    // const {fd, readStream, writeStream} = await rw(path, options);

    // create read stream from file
    // make sure chunk does not end with any of these chars: /index.htm
    // if so, add to chunk
    // if not, check for existence of /index.html and replace with ''
    // check for existence of .html and replace with ''
    // write chunk to file
}
