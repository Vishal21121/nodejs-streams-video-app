import React from 'react'

function VideoUploadFile() {
    return (
        <div className="w-full flex justify-center p-8">
            <form className='flex gap-4' action='http://localhost:8080/upload' method='POST' enctype="multipart/form-data">
                <input type="file" className="file-input w-full max-w-xs" name="video" />
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default VideoUploadFile