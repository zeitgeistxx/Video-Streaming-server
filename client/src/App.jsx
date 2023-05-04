import { useState } from "react"
import VideoPlayer from "./components/VideoPlayer"
import './App.css'

const App = () => {
    const [videoId, setVideoId] = useState(null)

    const playvideo = (e, videoId) => {
        e.preventDefault()

        setVideoId(videoId)
    }


    return (
        <div className="App">
            {videoId && <VideoPlayer videoId={videoId} />}
            <br></br>
            <button onClick={(e) => {playvideo(e, 'valorant')}}>Play Video 1</button>
            <button onClick={(e) => {playvideo(e, 'cyberSec')}}>Play Video 2</button>
        </div>
    )
}

export default App