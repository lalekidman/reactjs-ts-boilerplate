import http from 'axios'
interface IUploadOptions {
  blobStartingByte?: number
}
interface IEventListener {
  completed: (result: any) => void
  progress: (progress: number) => void
  error: (error: Error) => void
  abort: (status: boolean) => void
}
interface IOptions {
  fileUploadEndpoint: string,
  fileLoadedEndpoint: string,
}
class BlobUploader {
  private fileId = ''
  private isAborted = false
  private filesize = 0
  private fileName = ''
  private filetype = ''
  private totalLoaded = 0
  private selectedFile!: File
  private chunkSize = ((1024 * 1024) * 10) // 10mb
  private eventListener = {
    completed: () => {},
    error: () => {},
    progress: () => {},
    abort: () => {},
  } as IEventListener

  constructor (private readonly deps: IOptions) {}
  /**
   * upload the selected file
   * @param file 
   * @param blobName 
   * @param options 
   */
  public upload (file: File, blobName: string, options?: IUploadOptions) {
    const {
      blobStartingByte = 0
    } = options || {}
    this.fileId = blobName
    this.filesize = file.size
    this.fileName = file.name
    this.selectedFile = file
    this.chunkUploader(blobStartingByte)
  }
  /**
   * chunk the selected file and then upload it thru server.
   * @param blobStartingByte 
   */
  private chunkUploader (blobStartingByte: number) {
    let blobByteLength = this.filesize >= (blobStartingByte + this.chunkSize) ? (blobStartingByte + this.chunkSize) : this.filesize
    this.uploadToServer(this.selectedFile.slice(blobStartingByte, blobByteLength))
      .then(() => {
        if (!this.isAborted && blobByteLength < this.filesize) {
          return this.chunkUploader(blobByteLength)
        }
        return true
      })
  }
  /**
   * upload the chunked blob to the server
   * @param file 
   */
  private uploadToServer = async (chunkedBlob: Blob) => {
    return new Promise((resolve) => {
      const request = new XMLHttpRequest()
      const formData = new FormData()
      formData.append('blob', chunkedBlob, this.fileName)
      request.open("POST", this.deps.fileUploadEndpoint, true)
      request.setRequestHeader('X-File-Id', this.fileId)
      request.setRequestHeader('X-File-Size', this.filesize.toString())
      request.setRequestHeader('X-File-mimetype', this.selectedFile.type.toString())
      request.setRequestHeader('Authorization', `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJjZWVhNDEyYi0xYTk5LTRhMzAtYjBhMi1kODU3MjA5ZDgxNjkiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vZWQzYjU0MjYtZGFkZi00MjUwLWJjMTUtOWU2YWVmZTQ3ZmQ2L3YyLjAiLCJpYXQiOjE2MTU0NjkwNjksIm5iZiI6MTYxNTQ2OTA2OSwiZXhwIjoxNjE1NDcyOTY5LCJhaW8iOiJBVFFBeS84VEFBQUFVK3ZhU21nakZWNklYcUZkYW5uV2dzeUVhaHRNVzVidkUyTlREN2JOYnZHT3RKYk9EeTRRaEswYkREODcyWlM3IiwiYXpwIjoiY2VlYTQxMmItMWE5OS00YTMwLWIwYTItZDg1NzIwOWQ4MTY5IiwiYXpwYWNyIjoiMCIsIm5hbWUiOiJKb2huIERvZSIsIm9pZCI6IjFlMzEwNzE2LWYzNWQtNGM1MC04ZTlkLTJhMzZlM2RmMTFhMSIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3RtYWlsMDAxMEBhcmZ4aG9tZWRldi5vbm1pY3Jvc29mdC5jb20iLCJyaCI6IjAuQUFBQUpsUTc3ZF9hVUVLOEZaNXE3LVJfMWl0QjZzNlpHakJLc0tMWVZ5Q2RnV2tkQU9NLiIsInNjcCI6ImRldi5yZWFkIiwic3ViIjoiTnIycjFnS2hpLVJIREpkenlpcWJ4VUVlZ3gzdHkwd25pSVhOdWVLU2F0USIsInRpZCI6ImVkM2I1NDI2LWRhZGYtNDI1MC1iYzE1LTllNmFlZmU0N2ZkNiIsInV0aSI6ImEtblF4RGdBTWtXalRNS3FUZ1FXQUEiLCJ2ZXIiOiIyLjAifQ.GUyUpGvMFt-GFJVg1HrBwCmzp90WIOVHXtiOD9PbOfYAZ6cFUOnut9D8k2pm5FIx-qL4gbwfyDPDIvWkYemXZwKBLb_aGam76rt_8EMopg1NqT2rIqQnDgEpd5uVgw81rn9_3qpqRAt9ki_SEDmtQ93z4lIRjapKq1sDC49s5Ubwge73BNNWc4gh96Gc0tj7lSjtZzC3FpHnjG7a-3jlEwip6sxV2z2GfNjIwEuEsDyAk702mbmyNVi6hQ_doWy9qIxMXg5KJpkL9sItxdpJ_4DZ5O5z1BvjSl3vKJwPnXTqsfSU2XbpCF8FOCz-XXgKsvzSnVIWBdaDI4oJLiE2jA`)
      request.onload = (ev) => {
        resolve(true)
        this.eventListener.completed(ev)
      }

      request.upload.onprogress = (ev) => {
        // computation
        this.eventListener.progress(0)
      }
      request.onerror = (e: any) => this.eventListener.error(e)
      
      request.onabort = (e: any) => this.eventListener.abort(true)

      request.ontimeout = (e: any) => this.eventListener.error(e)
      
      request.send(formData);
    })
  }

  public resume (fileId: string, uploadedFile: File) {
    this.isAborted = false
    http({
      url: `${this.deps.fileLoadedEndpoint}?fileId=${fileId}`,
      method: "GET"
    })
    // .then((response) => response.json())
    .then((response) => {
      console.log('data :>> ', response.data);
      this.upload(uploadedFile, fileId, {
        blobStartingByte: response.data.totalBytesUploaded
      })
    })
  }
  public abort () {
    this.isAborted = true
  }
  /**
   * event listener
   * @param event 
   * @param callback 
   */
  public on(event: keyof IEventListener, callback:(result: any) => void = (data: any) => {}): void {
    this.eventListener[event] = callback
    // switch (event) {
    //   case "completed":
    //     this.callbackListener = callback
    //     // this.onComplete = callback
    //     break;
    //   case "progress":
    //     callback = this.onProgress
    //     break;
    //   case "error":
    //     callback = this.onError
    //     break;
    //   case "abort":
    //     callback = this.onAbort
    //     break;
    //   default:
    //     break
    // }
  }
}
export default BlobUploader