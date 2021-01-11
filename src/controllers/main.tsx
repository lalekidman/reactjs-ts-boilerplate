import React from 'react'
import Todos from './todos/index'
import SignIn from './authentication/index'
import {
  Switch,
  Route, 
  BrowserRouter as Router} from 'react-router-dom'
// import Toast from '../utils/Toast'
// import {bindActionCreators} from 'redux'
// import {connect} from 'react-redux'
class Wrapper extends React.Component {
  render () {
    return (
      <Router>
        <div>
            <Switch>
              <Route path="/sign-in">
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
// const mapStateToProps = () => {
//   return {
    
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//   }, dispatch)
// }
export default Wrapper
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper))