import React from 'react'
import OrderComponent from './orders/order'
// import {Switch, withRouter} from 'react-router-dom'
// // import Toast from '../utils/Toast'
// import {bindActionCreators} from 'redux'
// import {connect} from 'react-redux'
class Wrapper extends React.Component {
  render () {
    return (
      <div>
          <OrderComponent />
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