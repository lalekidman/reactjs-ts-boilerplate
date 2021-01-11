import React, { ChangeEvent } from 'react'
import {bindActionCreators} from 'redux'
import {signInAccount} from '../../redux/sign-in/actions'
import {connect} from 'react-redux'
import { AppState } from '../../store-redux'

import {
  Button,
  Alert, Form
} from 'react-bootstrap'
// import {
//   Button,
//   TextField
// } from '@material-ui/core'
import { ISignInAccountParams } from '../../redux/sign-in/interfaces'
import { DEFAULT_REDUCER_STATUSES } from '../../utils/constants'
interface IComponentState {
  formData: ISignInAccountParams
}

interface  IMapStateToProps extends Pick<AppState, 'authentication'> {
}
interface IMapDispatchToProps {
  signInAccount: (data: ISignInAccountParams) => void
}
// type IProps = IMapDispatchToProps
type IProps = IMapDispatchToProps & IMapStateToProps
class ContainerComponent extends React.Component<IProps, IComponentState> {
  public state = {
    formData: {
      username: '',
      password: '',
    }
  }
  constructor (props: any) {
      super(props)
      this.handleSignInButton = this.handleSignInButton.bind(this)
  }
  protected handleSignInResponse ({authentication}: IProps) {
  // protected handleFetchOrderListState ({}: IProps) {
    if (this.props.authentication.status !== authentication.status) {
      if (authentication.status === DEFAULT_REDUCER_STATUSES.FETCHED) {
        console.log(' >>. fetched data ', authentication)
        // this.setState({orders: authentication.data})
      } else if (authentication.status === DEFAULT_REDUCER_STATUSES.FETCHING) {
        console.log(' >>. fetching order list...')
      } else if (authentication.status === DEFAULT_REDUCER_STATUSES.FAILED) {
        console.log(' >> failed to fetch order list. => ', authentication)
      }
    }
  }
  protected handleSignInButton = () => {
    const {formData} = this.state
    console.log('formData :>> ', formData);
    this.props.signInAccount(formData)
    // this.props.addTodo({content: newTodo})
  }
  protected handleFormData = (formField: any) => {
    const {formData} = this.state
    this.setState({
      formData: Object.assign(formData, formField)
    })
  }
  public componentWillMount () {
    // this.props.fetchOrdersList()
  }
  public componentWillReceiveProps (newProps: IProps) {
    // this.handleFetchOrderListState(newProps)
    this.handleSignInResponse(newProps)
  }
  public render () {
    const {formData} = this.state
    return (
      <div id='sign-in-wrapper'>
        <Form.Control
          placeholder='Username'
          value={formData.username}
          onChange={(e) => this.handleFormData({username: e.target.value})}
          /><br />
        <Form.Control
          placeholder='Password'
          type='password'
          value={formData.password}
          onChange={(e) => this.handleFormData({password: e.target.value})}
          /><br />
        <Button 
          variant="primary"
          onClick={this.handleSignInButton}>Sign-in</Button>
      </div>
    )
  }
}
const mapStateToProps = ({authentication} : AppState, ownProps: any): IMapStateToProps => {
  return {
    authentication
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    signInAccount
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ContainerComponent)