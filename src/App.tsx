import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {v4 as uuid} from 'uuid'
import ChunkUploader from './chunk-uploader'
const SERVER_HOST = 'http://localhost:3000'

const MainContainer = () => {
  const [uploadedFile, setUploadedFile] = useState({})
  const [chunkUploader] = useState(() => (new ChunkUploader({
    fileLoadedEndpoint: `${SERVER_HOST}/status`,
    fileUploadEndpoint: `${SERVER_HOST}/v1/products/e2e69571-a63b-44a0-930e-6755b12266f2/preview-video`,
  })))
  const [progressBar, setProgressBar] = useState(0)

  useEffect(() => {
    chunkUploader.on("completed", () => {
      
    })
    chunkUploader.on("progress", (progress: number) => {
      console.log('progress :>> ', progress);
    })
  })
  // const inputFile = useRef(null)
  const handleFileOnChange = async (ev: any) => {
  // const handleFileOnChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = ev?.target?.files[0]
    setUploadedFile(selectedFile)
    const fileId = uuid()
    // return;
    chunkUploader.upload(selectedFile as File, `${fileId}.${selectedFile.name.split('.').pop()}`)
  }

  const resumeUploadHandler = () => {
    chunkUploader.resume('', uploadedFile as File)
  }
  const stopUploadHandler = () => {
    chunkUploader.abort()
  }
  return (
    <div>
      <h1>Open Hellox World.txt</h1>
      <div className="Hello">
        {/* <button type="button" onClick={upload}>
          Open File
        </button> */}
        <input onChange={handleFileOnChange} type='file' name = 'blobFile'/>
        <progress id="file" value={progressBar} max="100"> {progressBar}% </progress>
        <button onClick={stopUploadHandler}>Stop</button>
        <button onClick={resumeUploadHandler}>Resume</button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainContainer} />
      </Switch>
    </Router>
  );
}
