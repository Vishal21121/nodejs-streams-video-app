import React from 'react'

function VideoUploadFile() {
    return (
        <form action='http://localhost:8080/upload' method='POST' enctype="multipart/form-data">
            <input type="file" className="file-input w-full max-w-xs" name="video" />
            <button className='btn'>Submit</button>
        </form>
    )
}

export default VideoUploadFile