import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {v4 as uuid} from 'uuid'
import http from 'axios'
const SERVER_HOST = 'http://localhost:5002'
const blobUploader = () => {
  let fileId = ''
  let isAborted = false
  let filesize = 0
  let fileName = ''
  let totalLoaded = 0
  const chunkSize = ((1024 * 1024) * 10) // 10mb
  const uploader = (file: File, blobName: string, options?: {blobStartingByte: number}) => {
    const {
      blobStartingByte = 0
    } = options || {}
    fileId = blobName
    filesize = file.size
    fileName = file.name
    const u = (blobStartingByte: number) => {
      let blobByteLength = file.size > (blobStartingByte + chunkSize) ? (blobStartingByte + chunkSize) : file.size
      uploadFiles(file.slice(blobStartingByte, blobByteLength), blobName)
        .then(() => {
          if (!isAborted && blobStartingByte < file.size) {
            // setTimeout(() => {
            //   u(blobByteLength)
            // }, 1000)
            return u(blobByteLength)
          }
          return true
        })
    }
    const uploadFiles = (file: Blob, fileId: string) => {
      return new Promise((resolve, reject) => {
        const httpOptions = {
          url: `${SERVER_HOST}/upload`,
          onAbort: (e: ProgressEvent<EventTarget>) => {
            console.log('@on abort');
            reject(e)
          },
          onError: (e: ProgressEvent<EventTarget>) => {
            console.log('@on onError');
            reject(e)
          },
          onProgress: (ev: ProgressEvent<EventTarget>) => {
            // totalLoaded = totalLoaded - ev.loaded
            console.log('ddd :dd>> ', totalLoaded);
            // listener.onProgress(ev.loaded * 100 / ev.total)
            // const percentage = (totalLoaded * 100) / filesize
            console.log('percenxtaqwege :>> ', ev);
            // listener.onProgress(percentage)
          },
          onComplete: () => {
            console.log('@on xonComplete');
            resolve(true)
          },
        }
      
        const uploadToServer = (file: Blob, options: typeof httpOptions) => {
          const request = new XMLHttpRequest()
          const formData = new FormData()
          formData.append('blob', file, fileName)
          request.open("POST", options.url, true)
          request.setRequestHeader('X-File-Id', fileId)
          request.setRequestHeader('X-File-Size', filesize.toString())
      
          request.onload = () => options.onComplete();
      
          request.upload.onprogress = (ev) => options.onProgress(ev);
      
          request.onerror = (e) => options.onError(e);
          
          request.onabort = (e) => options.onAbort(e);
      
          request.ontimeout = (e) => options.onError(e);
          
          request.send(formData);
        }
        uploadToServer(file, httpOptions)
      })
    }
    u(blobStartingByte)
  }
  const listener = {
    onProgress: () => {},
    abort: () => {
      isAborted = true
    },
    resume: (uploadedFile: File) => {
      isAborted = false
      http({
        baseURL: SERVER_HOST,
        url: `/status?fileId=${fileId}`,
        method: "GET"
      })
      // .then((response) => response.json())
      .then((response) => {
        console.log('data :>> ', response.data);
        uploader(uploadedFile, fileId, {
          blobStartingByte: response.data.totalBytesUploaded
        })
      })
    },
    uploader: uploader
  }
  return listener
}
const MainContainer = () => {
  const [uploadedFile, setUploadedFile] = useState({})
  const [uploader, setUploader] = useState(() => (blobUploader()))
  const [progressBar, setProgressBar] = useState(0)

  useEffect(() => {
    // const uploader = blobUploader()
    setUploader(uploader)
    // uploader.onProgress = (percentage: number) => {
    //   setProgressBar(percentage)
    // }
  }, [])
  // const inputFile = useRef(null)
  const handleFileOnChange = async (ev: any) => {
  // const handleFileOnChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = ev?.target?.files[0]
    setUploadedFile(selectedFile)
    const fileId = uuid()
    console.log('up@@@@@@dddd@@@@loadqweedFile :>> ', uploadedFile);
    // return;
    uploader.uploader(selectedFile as File, `${fileId}.${selectedFile.name.split('.').pop()}`)
  }

const resumeUploadHandler = () => {
  uploader.resume(uploadedFile as File)
}
const stopUploadHandler = () => {
  uploader.abort()
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
