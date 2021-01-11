import React from 'react'
import Todos from './todos/index'
// import {Switch, withRouter} from 'react-router-dom'
// import Toast from '../utils/Toast'
// import {bindActionCreators} from 'redux'
// import {connect} from 'react-redux'
class Wrapper extends React.Component {
  render () {
    return (
      <div>
          <Todos />
      </div>
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