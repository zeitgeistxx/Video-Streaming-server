import { useRef, useEffect } from "react"

const VideoPlayer = ({ videoId }) => {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.removeAttribute('src')
            videoRef.current.load()
        }
    })

    return (
        <>
            <video ref={videoRef} width={320} height={240} controls>
                <source src={`http://192.168.0.104:8686/videos/${videoId}`} type="video/mp4"></source>
                Your browser does not support the video tag
            </video>
        </>
    )
}

export default VideoPlayer