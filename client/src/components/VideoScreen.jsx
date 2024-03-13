import React, { useEffect, useRef } from 'react'


function VideoScreen() {
    const vidoeRef = useRef(null)
    const videoElement = useRef(null)

    const handleClick = async () => {
        const response = await fetch(`http://localhost:8080/video`, {
            headers: {
                "Range": "bytes=0-"
            }
        });
        const data = await response.json()
        vidoeRef.current.src = data.data.video.videoUrl
        videoElement.current.load()
    }

    useEffect(() => {
        handleClick()
    }, [])

    return (
        <div className="w-full flex justify-center p-8 h-[90vh]">
            <div className="w-1/2 mockup-window border bg-base-300 ">
                <div className="flex flex-col items-center gap-8 px-4 py-8 bg-base-200">
                    <video ref={videoElement} className="w-full" autoPlay controls>
                        <source ref={vidoeRef} src="" />
                    </video>
                    <button onClick={handleClick} className="w-fit btn btn-primary">Next</button>
                </div>
            </div>
        </div>
    )
}

export default VideoScreen