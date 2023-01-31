import React, { Component} from 'react'

//connecting redux to components
import { connect } from 'react-redux'
import { Todo, fetchTodos, deleteTodo, addTodo, updateTodo } from './redux/actions'
import { StoreState } from './redux/reducers'

/*
  >>> props for this components
  create an interface that you expect
  this component should have or received
*/

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  addTodo: Function;
  updateTodo: Function;
  deleteTodo: typeof deleteTodo;
}

class _App extends Component<AppProps> {

  // componentDidMount(): void {
  //     this.props.fetchTodos();
  // }

  handlerFetchTodo = (): void => {
    this.props.fetchTodos();

    console.log(this.props.todos);
    
  };

  handlerAddTodo = (): void => {
    console.log("clicked");

    // i have to use urlseachparam since I am using encodedurl
    // I am not actually sure why this happened, but  this behavior
    // occurs in postman, and I cant use the form-data, I ben stuck in this part for a long time, so to proceed, I have to use urlencoded for a while
    const params = new URLSearchParams();
    params.append('text', 'new todo');
    params.append('completed', 'false');

    // console.log(params);  
    

    this.props.addTodo(params);
  };

  onTodoClick = (id: string): void => {

    this.props.deleteTodo(id);
  };

  handlerEdit = (id: string): void => {
     const params = new URLSearchParams();
    params.append('text', 'new todo updated');
    params.append('completed', 'false');

    // console.log(id);
    
    this.props.updateTodo(id, params);
  };

  // renderTodoForm(): JSX.Element {
  //   return (
  //     <div >
  //      <h1>Hi There</h1>
  //      <form action="">
  //       <input type="text" name='text' />
  //       <button type='submit'>Submit</button>
  //      </form>
  //     </div>
  //   );
  // }

  renderTodos(): JSX.Element[] {
    return this.props.todos.map((todo:Todo)=>{
      return (
        <div  key={todo.id}>
          {todo.text}
          <button onClick={() => this.onTodoClick(todo.id)}>X</button>
          <button onClick={() => this.handlerEdit(todo.id)}>~</button>
        </div>
    );
    });
  }

  render() {
    
    return (
      <div>

        <button onClick={this.handlerFetchTodo}>Fetch</button>

        <button onClick={this.handlerAddTodo}>Add Todo</button>
      
        {this.renderTodos()}
      </div>
    )
  }
}


const mapStateToProps = ({todos}: StoreState): {todos: Todo[]} => {
  return {
    todos
  }
}

const App = connect(
  mapStateToProps,
  {fetchTodos, deleteTodo, addTodo, updateTodo }
)(_App)

export default App