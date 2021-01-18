import React from 'react'
import Todos from './todos/index'
import SignIn from './authentication/index'
import {
  Switch,
  Route, 
  BrowserRouter as Router, withRouter} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { AppState } from '../store-redux'
import {
  validateAuthentication
} from '../redux/validate-authentication/actions'
import { DEFAULT_REDUCER_STATUSES } from '../utils/constants'
interface  IMapStateToProps extends Pick<AppState, 'auth'> {
}
interface IComponentState {
}

interface IMapDispatchToProps {
  validateAuthentication: () => void
}
// type IProps = IMapDispatchToProps
type IProps = IMapDispatchToProps & IMapStateToProps
class ContainerComponent extends React.Component<IProps, IComponentState> {
// class Wrapper extends React.Component {

  handleValidateAuthenticationResponse ({auth}: IProps) {
    console.log('this.props.history :>> ', this.props);
    if (this.props.auth.status !== auth.status) {
      if (auth.status === DEFAULT_REDUCER_STATUSES.FETCHED) {
        console.log(' >>. fetched data ', auth)
        // this.setState({orders: auth.data})
      } else if (auth.status === DEFAULT_REDUCER_STATUSES.FETCHING) {
        console.log(' >>. validating authentication...')
      } else if (auth.status === DEFAULT_REDUCER_STATUSES.FAILED) {
        console.log(' >> failed to fetch order list. => ', auth)
        
      }
    }
  }
  componentDidMount () {
    this.props.validateAuthentication()
  }
  componentWillReceiveProps (props: IProps) {
    this.handleValidateAuthenticationResponse(props)
  }
  render () {
    if (this.props.auth.status === DEFAULT_REDUCER_STATUSES.FETCHING) {
      return null;
    }
    return (
      <Router>
        <div>
            <Switch
              ref='/sign-in'>
              <Route
                path="/sign-in">
                <SignIn />
              </Route>
              <Route path="/todos">
                <Todos />
              </Route>
            </Switch>
        </div>
      </Router>
    )
  }
}
const mapStateToProps = ({auth} : AppState, ownProps: any): IMapStateToProps => {
  return {
    auth
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    validateAuthentication
  }, dispatch)
}
// export default Wrapper
export default connect(mapStateToProps, mapDispatchToProps)(ContainerComponent)