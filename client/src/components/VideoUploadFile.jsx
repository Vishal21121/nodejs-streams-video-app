import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'

function VideoUploadFile() {
    const navigate = useNavigate()
    const fileRef = useRef(null)

    const fileUploadHandler = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("video", fileRef.current.files[0])
        let toastId
        try {
            toastId = toast.loading("Uploading video")
            const response = await fetch("http://localhost:8080/upload", {
                method: "POST",
                mode: "cors",
                body: formdata
            })
            const data = await response.json()
            if (data.data.statusCode === 201) {
                console.log("video uploaded")
                toast.success("Video uploaded successfully", { id: toastId });
                navigate("/")
            }
        } catch (error) {
            toast.error("Video upload failed", { id: toastId });
            console.log(error)
        }
    }

    return (
        <div className="w-full flex justify-center p-8">
            <form className='flex gap-4' onSubmit={fileUploadHandler}>
                <input ref={fileRef} type="file" className="file-input w-full max-w-xs" name="video" />
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default VideoUploadFile