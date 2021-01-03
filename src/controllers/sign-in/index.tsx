import React, { ChangeEvent } from 'react'
// import {Switch, withRouter} from 'react-router-dom'
// import Toast from '../utils/Toast'
import {bindActionCreators} from 'redux'
import {signInAccount} from '../../redux/sign-in/actions'
import {connect} from 'react-redux'
// import {connect, MapDispatchToProps} from 'react-redux'
// import { DEFAULT_REDUCER_STATUSES } from '../../utils/constants'
import { AppState } from '../../store-redux'

import {
  Button,
  TextField
} from '@material-ui/core'
// import { IFetchOrderState } from '../../redux/sign-in/interfaces'
// import { IPaginationResponse } from '../../utils/interfaces'
interface IComponentState {
  username: string
  password: string
}
interface HomeProps {
  order?: any
}

interface  IMapStateToProps {
  // orderList: IFetchOrderState
}
interface IMapDispatchToProps {
  signInAccount: () => void
}
type IProps = IMapDispatchToProps
// type IProps = IMapDispatchToProps & IMapStateToProps
class ContainerComponent extends React.Component<IProps, IComponentState> {
  public state = {
    username: '',
    password: ''
  }
  constructor (props: any) {
      super(props)
      this.handleSignInButton = this.handleSignInButton.bind(this)
      this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this)
      this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this)
  }
  protected handleFetchOrderListState () {
  // protected handleFetchOrderListState ({}: IProps) {
    // if (this.props.orderList.status !== orderList.status) {
    //   if (orderList.status === DEFAULT_REDUCER_STATUSES.FETCHED) {
    //     console.log(' >>. fetched data ', orderList)
    //     this.setState({orders: orderList.data})
    //   } else if (orderList.status === DEFAULT_REDUCER_STATUSES.FETCHING) {
    //     console.log(' >>. fetching order list...')
    //   } else if (orderList.status === DEFAULT_REDUCER_STATUSES.FAILED) {
    //     console.log(' >> failed to fetch order list. => ', orderList)
    //   }
    // }
  }
  protected handleSignInButton = () => {
    const {password, username} = this.state
    this.props.signInAccount()
    // console.log('username :>> ', username);
    // console.log('password :>> ', password);
  }
  protected handleUsernameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({username: event.target.value})
  }
  protected handlePasswordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({password: event.target.value})
  }
  public componentWillMount () {
    // this.props.fetchOrdersList()
  }
  public componentWillReceiveProps (newProps: IProps) {
    // this.handleFetchOrderListState(newProps)
  }
  public render () {
    const {password, username} = this.state
    return (
      <div>
        <br />
        <TextField type='text' value={username} placeholder = 'Email/Username' onChange={this.handleUsernameOnChange}/>
        <br />
        <TextField type='Password' value={password} placeholder = 'Password' onChange={this.handlePasswordOnChange}/>
        <Button 
          color = 'primary'
          variant="contained"
          onClick={this.handleSignInButton}>SignIn</Button>
      </div>
    )
  }
}
const mapStateToProps = ({authorizedAccount} : AppState, ownProps: HomeProps): IMapStateToProps => {
  return {authorizedAccount}
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    signInAccount
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ContainerComponent)