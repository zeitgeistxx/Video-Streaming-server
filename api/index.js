const express = require('express')
const fs = require('node:fs')


const app = express()


const videoFileMap = {
    'cyberSec': 'videos/CyberSecurity.mov',
    'valorant': 'videos/Valorant.mp4'
}

app.get('/videos/:videoname', async (req, res) => {
    const fileName = req.params.videoname
    const filePath = videoFileMap[fileName]
    if (!filePath) {
        return res.status(404).send('File not found')
    }

    const fileSize = fs.statSync(filePath).size
    const range = req.headers.range

    if (range) {
        let [start, end] = range.replace(/bytes=/, '').split('-')
        start = parseInt(parts[0], 10)
        end = end ? parseInt(parts[1], 10) : fileSize - 1

        
        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-ranges': 'bytes',
            'Content-Length': end -start + 1,
            'Content-Type': 'video/mp4'
        })
        fs.createReadStream(filePath, { start, end }).pipe(res)
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