import { useRef } from "react";
import VideoUploadFile from "./VideoUploadFile";

function App() {
  const vidoeRef = useRef(null)
  const videoElement = useRef(null)

  const handleClick = async () => {
    let videoId = Math.floor(Math.random() * 6) + 1
    await fetch(`http://localhost:8080/${videoId}`, {
      headers: {
        "Range": "bytes=0-"
      }
    });
    vidoeRef.current.src = `http://localhost:8080/${videoId}`
    videoElement.current.load()
  }

  return (
    // <div className="w-full flex justify-center p-8">
    //   <div className="w-1/2 mockup-window border bg-base-300">
    //     <div className="flex flex-col items-center gap-8 px-4 py-16 bg-base-200">
    //       <video ref={videoElement} className="w-full" autoPlay controls>
    //         <source ref={vidoeRef} src={"http://localhost:8080/1"} />
    //       </video>
    //       <button onClick={handleClick} className="w-fit btn btn-primary">Next</button>
    //     </div>
    //   </div>
    // </div>
    <VideoUploadFile />
  );
}


export default App;
