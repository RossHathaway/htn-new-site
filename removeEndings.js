const rw = require('rw-stream')
const readDir = require('recursive-readdir')
const replaceStream = require('replacestream')

const files = readDir('./dist', [ignoreFunc], readDirCb)

function ignoreFunc(file, stats) {
    return !file.endsWith('.html') && !stats.isDirectory()
}

async function readDirCb(err, result) {
    if (err) {
        throw new Error(err)
    }

    for (const file of result) {
        const { fd, readStream, writeStream } = await rw(file, {})
        readStream
            .pipe(replaceStream('/index.html', ''))
            .pipe(replaceStream('.html', ''))
            .pipe(writeStream)
    }
}
