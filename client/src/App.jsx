import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import VideoScreen from "./components/VideoScreen";
import VideoUploadFile from "./components/VideoUploadFile";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <BrowserRouter>
      <Toaster
        toastOptions={
          {
            style: {
              backgroundColor: "rgb(3 7 18)",
              color: "#fff",
            }
          }
        }
        position='top-right'
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<VideoScreen />} />
          <Route path="form" element={<VideoUploadFile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // <VideoUploadFile />
  );
}


export default App;
