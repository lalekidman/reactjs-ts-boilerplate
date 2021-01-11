import React, { ChangeEvent } from 'react'
import {bindActionCreators} from 'redux'
import {addTodo} from '../../redux/todos/actions'
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
import { ITodoData } from '../../redux/todos/interfaces'
import { DEFAULT_REDUCER_STATUSES } from '../../utils/constants'
interface IComponentState {
  newTodo: string
}

interface  IMapStateToProps extends Pick<AppState, 'addedTodo'> {
}
interface IMapDispatchToProps {
  addTodo: (data: ITodoData) => void
}
// type IProps = IMapDispatchToProps
type IProps = IMapDispatchToProps & IMapStateToProps
class ContainerComponent extends React.Component<IProps, IComponentState> {
  public state = {
    newTodo: '',
  }
  constructor (props: any) {
      super(props)
      this.handleAddTodosButton = this.handleAddTodosButton.bind(this)
      this.newTodos = this.newTodos.bind(this)
  }
  protected handleAddTodoResponse ({addedTodo, }: IProps) {
  // protected handleFetchOrderListState ({}: IProps) {
    if (this.props.addedTodo.status !== addedTodo.status) {
      if (addedTodo.status === DEFAULT_REDUCER_STATUSES.FETCHED) {
        console.log(' >>. fetched data ', addedTodo)
        // this.setState({orders: addedTodo.data})
      } else if (addedTodo.status === DEFAULT_REDUCER_STATUSES.FETCHING) {
        console.log(' >>. fetching order list...')
      } else if (addedTodo.status === DEFAULT_REDUCER_STATUSES.FAILED) {
        console.log(' >> failed to fetch order list. => ', addedTodo)
      }
    }
  }
  protected handleAddTodosButton = () => {
    const {newTodo} = this.state
    this.props.addTodo({content: newTodo})
  }
  protected newTodos = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({newTodo: event.target.value})
  }
  public componentWillMount () {
    // this.props.fetchOrdersList()
  }
  public componentWillReceiveProps (newProps: IProps) {
    // this.handleFetchOrderListState(newProps)
    this.handleAddTodoResponse(newProps)
  }
  public render () {
    const {newTodo} = this.state
    return (
      <div>
        <br />

        {/* <TextField type='text' value={newTodo} placeholder = "Enter Todo's" onChange={this.newTodos}/> */}
        <Form.Control
          placeholder='New Todo'
          value={newTodo}
          onChange={this.newTodos}
          />
        <Button 
          variant="primary"
          onClick={this.handleAddTodosButton}>Add Todo</Button>
      </div>
    )
  }
}
const mapStateToProps = ({addedTodo} : AppState, ownProps: any): IMapStateToProps => {
  return {
    addedTodo
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    addTodo
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ContainerComponent)