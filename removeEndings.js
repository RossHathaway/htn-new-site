const rw = require('rw-stream')
const readDir = require('recursive-readdir')

const files = readDir('./dist', [ignoreFunc], readDirCb)

function ignoreFunc(file, stats) {
    return !file.endsWith('.html') && !stats.isDirectory()
}

function readDirCb(err, result) {
    if (err) {
        throw new Error(err)
    }

    for (const file of result) {
        console.log('file', file)

        // const {fd, readStream, writeStream} = await rw(path, options);

        // create read stream from file
        // make sure chunk does not end with any of these chars: /index.htm
        // if so, add to chunk
        // if not, check for existence of /index.html and replace with ''
        // check for existence of .html and replace with ''
        // write chunk to file
    }
}
