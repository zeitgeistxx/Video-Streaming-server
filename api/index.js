const express = require('express')
const fs = require('node:fs')


const app = express()


const videoFileMap = {
    'cyberSec': 'videos/CyberSecurity.mov',
    'valorant': 'videos/Valorant.mp4'
}

app.get('/videos/:videoname', (req, res) => {
    const fileName = req.params.videoname
    const filePath = videoFileMap[fileName]
    if (!filePath) {
        return res.status(404).send('File not found')
    }

    const fileSize = fs.statSync(filePath).size
    const range = req.headers.range

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

        const chunkSize = end - start + 1
        const fileStream = fs.createReadStream(filePath, { start, end })

        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
        }
        res.writeHead(206, head)
        fileStream.pipe(res)
    }
    else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        }
        res.writeHead(200, head)
        fs.createReadStream(filePath).pipe(res)
    }
})


const port = 8686
app.listen(port, () => {
    console.log(`Server PORT: ${port}`)
})