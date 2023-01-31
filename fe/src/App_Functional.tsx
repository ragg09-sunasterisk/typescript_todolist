import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { StoreState } from './redux/reducers'
import { Todo, fetchTodos, deleteTodo, addTodo, updateTodo } from './redux/actions'


function _App(): JSX.Element {
    useEffect(() => {
       console.log( fetchTodos());
       
    }, [])


  
    

    return (
        <Fragment>
            <div>App</div>
        </Fragment>
    )
}

const mapStateToProps = ({todos}: StoreState): {todos: Todo[]} => {
    return {
      todos: todos
    }
  }
  
  const App = connect(
    mapStateToProps,
    {fetchTodos, deleteTodo, addTodo, updateTodo }
  )(_App)
  
export default App

