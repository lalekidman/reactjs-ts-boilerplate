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
class ContainerComponent extends React.Component<IProps, HomeState> {
  public state = {
      name: "sample State",
      orders: {
        totalCounts: 0,
        totalPages: 0,
        data: []
      }
  }
  constructor (props: any) {
      super(props)
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
  public componentWillMount () {
    this.props.fetchOrdersList()
  }
  public componentWillReceiveProps (newProps: IProps) {
    this.handleFetchOrderListState(newProps)
  }
  render () {
    const {name, orders} = this.state
    return (
      <div>
        
        <ul>
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