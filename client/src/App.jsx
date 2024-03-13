import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import VideoScreen from "./components/VideoScreen";
import VideoUploadFile from "./components/VideoUploadFile";
import Layout from "./components/Layout";

function App() {


  return (
    <BrowserRouter>
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
