import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from "react-player"


function VideoScreen() {
    const [url, setUrl] = useState("")

    const handleClick = async () => {
        const response = await fetch(`http://localhost:8080/video`, {
            headers: {
                "Range": "bytes=0-"
            }
        });
        const data = await response.json()
        setUrl(data.data.video.videoUrl)
    }

    useEffect(() => {
        handleClick()
    }, [])

    return (
        <div className="w-full flex justify-center p-8 h-[90vh]">
            <div className="w-1/2 mockup-window border bg-base-300 ">
                <div className="flex flex-col items-center gap-8 px-4 py-8 bg-base-200">
                    <ReactPlayer
                        url={url}
                        playing
                        controls
                        light
                        onEnded={handleClick}
                    />
                    <button onClick={handleClick} className="w-fit btn btn-primary">Next</button>
                </div>
            </div>
        </div>
    )
}

export default VideoScreen