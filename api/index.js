const express = require('express')
const fs = require('node:fs')
const multiParty = require('multiparty')
const { networkInterfaces } = require('node:os')


const app = express()


const videoFileMap = {
    'cyberSec': 'videos/CyberSecurity.mov',
    'valorant': 'videos/Valorant.mp4'
}

app.get('/videos/:videoname', async (req, res) => {
    const filePath = videoFileMap[req.params.videoname]
    if (!filePath) {
        return res.status(404).send('File not found')
    }

    const fileSize = fs.statSync(filePath).size
    const range = req.headers.range

    if (range) {
        let [start, end] = range.replace(/bytes=/, '').split('-')
        start = parseInt(start, 10)
        end = end ? parseInt(end, 10) : fileSize - 1


        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-ranges': 'bytes',
            'Content-Length': end - start + 1,
            'Content-Type': 'video/mp4'
        })
        fs.createReadStream(filePath, { start, end }).pipe(res)
    }
    else {
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        })
        fs.createReadStream(filePath).pipe(res)
    }
})


app.get('/video/upload', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.post('/', (req, res) => {
    let form = new multiParty.Form()
    form.on('part', (part) => {
        part.pipe(fs.createWriteStream(`./uploaded/${part.filename}`))
            .on('close', () => {
                res.status(200).send(`<h1>File Uploaded</h1> ${part.filename}`)
            })
    })
    form.parse(req)
})




let IP
const nets = networkInterfaces()
Object.entries(nets).forEach(([keys, vals]) => {
    if (keys === 'Wi-Fi') {
        IPV4 = vals[1].address
    }
})


const port = 8686
app.listen(port, IP, () => {
    console.log(`Server PORT: ${port}`)
})