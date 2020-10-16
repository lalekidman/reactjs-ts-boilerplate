import React, { ComponentProps } from 'react'
import {Switch, withRouter} from 'react-router-dom'
// import Toast from '../utils/Toast'
import {bindActionCreators} from 'redux'
import {fetchOrdersList} from '../../redux/orders/actions'
import {connect, MapDispatchToProps} from 'react-redux'
import { DEFAULT_REDUCER_STATUSES } from '../../utils/constants'
import { AppState } from '../../store-redux'
import { IFetchOrderData, IFetchOrderAction, IFetchOrderState } from '../../redux/orders/interfaces'
import { IPaginationResponse } from '../../utils/interfaces'
import {v4} from 'uuid'
import Http from 'axios'
interface HomeState {
  id?: string
  color?: string
  name?: string
  orders: IPaginationResponse
}
interface HomeProps {
  order?: any
}
type IProps = IMapDispatchToProps & IMapStateToProps
type IUploadedImage = any
class ContainerComponent extends React.Component<IProps> {
  public state = {
      name: "Upload file",
      orders: {
        totalCounts: 0,
        totalPages: 0,
        data: []
      },
      uploadedImage: '' as IUploadedImage,
      videoSource: ''
  }
  constructor (props: any) {
    super(props)
    this.handleUpload = this.handleUpload.bind(this)
  }
  protected handleFetchOrderListState ({orderList}: IProps) {
    if (this.props.orderList.status !== orderList.status) {
      if (orderList.status === DEFAULT_REDUCER_STATUSES.FETCHED) {
        console.log(' >>. fetched data ', orderList)
        this.setState({orders: orderList.data})
      } else if (orderList.status === DEFAULT_REDUCER_STATUSES.FETCHING) {
        console.log(' >>. fetching order list...')
      } else if (orderList.status === DEFAULT_REDUCER_STATUSES.FAILED) {
        console.log(' >> failed to fetch order list. => ', orderList)
      }
    }
  }
  public handleUpload (event: any) {
    if (!(event.target.files.length >= 1)) {
      return
    }
    this.handleUploadFileToServer(event.target.files[0])
    // this.setState({
    //   // videoSource: URL.createObjectURL(event.target.files[0])
    // })
  }
  public async handleUploadFileToServer (selectedFile: File) {
    try {
      // 10 kb
      // const chunkedSize = 1024 * 1024 * 10
      const chunkedSize = 1024 * 10
      const fileName = selectedFile.name
      const fileId = v4()
      let mediaBase64Url = ''
      const based64ImageLength = selectedFile.size
      let startChunkedSize = 0
      let endChunkedSize = chunkedSize
      let arr = [] as any
      //@ts-ignore
      const uploadToServer =  (file) => {
        return new Promise(async (resolve, reject) => {
          const upload = async (mediaFile: any): Promise<any> => {
            try {
              console.log(' >> file ', file)
              // const requestSize = Math.ceil(based64Image.length / chunkedSize)
              endChunkedSize = (based64ImageLength <= endChunkedSize) ? based64ImageLength : endChunkedSize
              console.log('object :>> startChunkedSize', startChunkedSize);
              console.log('object :>> endChunkedSize', endChunkedSize);
              console.log('object :>> based64ImageLength', based64ImageLength);
              try {
                const fileReader = new FileReader()
                fileReader.onloadend = async (event) => {
                const src = event.target?.result
                if (!src) {
                  return
                }
                const mediaBuffer = new Uint8Array(src as ArrayBuffer)
                arr.push(mediaBuffer)
                console.log("sxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrc: ", arr)
                // const base64Image = src.toString()
                // const base64Image = src.toString().replace("data:application/octet-stream;base64,", "")
                // console.log(' >> src: ', base64Image)
                // mediaBase64Url = mediaBase64Url.concat("___________", base64Image)
                // const newFormdata = new FormData()
                // newFormdata.append("media", mediaFile)
                // newFormdata.append("_id", fileId)
                // newFormdata.append("last", based64ImageLength === endChunkedSize ? "1" : "0")
                const res = await Http({
                  baseURL: 'http://localhost:5002',
                  // baseURL: 'http://devapi.kyoo.com/darryl/media-chunk',
                  url: '/upload',
                  method: "POST",
                  data: {
                    media: {
                      _id: fileId,
                      mediaBuffer: mediaBuffer,
                      mediaSize: based64ImageLength,
                      mediaName: fileName,
                      mediaChunkedSize: endChunkedSize,
                      mediaType: mediaFile.type,
                      last: based64ImageLength === endChunkedSize
                    }
                  },
                  // data: newFormdata,
                  // headers: {
                  //   'Content-Type': 'multipart/form-data'
                  // }
                })
                if (startChunkedSize < based64ImageLength && endChunkedSize < based64ImageLength) {
                  startChunkedSize = endChunkedSize
                  endChunkedSize += (chunkedSize)
                  return upload(file.slice(startChunkedSize, endChunkedSize))
                }
                resolve()
              }
              fileReader.readAsArrayBuffer(mediaFile)
              // fileReader.readAsDataURL(file)
              return true
              } catch (err) {
                console.log(' >>> error: ', err)
              }
              return true
            } catch (err) {
              console.log(' >> failed to upload file')
            }
          }
          upload(file)
        })
      }
      await uploadToServer(selectedFile)
      // var arrayBufferView = new Uint8Array( arr );
      var blob = new Blob( arr, { type: "image/jpeg" } );
      console.log("blob:" , blob)
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL( blob );
      // var img = document.querySelector( "#photo" );
      // img.src = imageUrl;
      this.setState({
        uploadedImage: imageUrl,
        // videoSource: "data:video/mp4;base64,".concat(mediaBase64Url)
        // videoSource: (mediaBase64Url),
        // uploadedImage: (mediaBase64Url)
      })
    } catch (err) {
      console.log(' >> error: ', err)
    }
  }

  public componentWillMount () {
    // this.props.fetchOrdersList()
  }
  public componentWillReceiveProps (newProps: IProps) {
    // this.handleFetchOrderListState(newProps)
  }
  render () {
    const {name, orders, uploadedImage, videoSource} = this.state
    console.log("videoSource: ", uploadedImage)
    return (
      <div>
        <ul>
          <video src={videoSource}></video>
          <input type="file" name="" id="" onChange={this.handleUpload}/>
          <img src={uploadedImage} alt="" height={500} width={500}/>
          {orders.data.map((o:any) => (<li key={o._id}>{o._id}</li>))}
        </ul>
        <h1>{name}</h1>
      </div>
    )
  }
}
interface  IMapStateToProps {
  orderList: IFetchOrderState
}
interface  IMapDispatchToProps {
  fetchOrdersList: () => void
}
const mapStateToProps = ({orderList} : AppState, ownProps: HomeProps): IMapStateToProps => {
  return {orderList}
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    fetchOrdersList
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ContainerComponent)