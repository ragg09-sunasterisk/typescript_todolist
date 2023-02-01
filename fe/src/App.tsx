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

  state = {
    text: '',
    updateText: '',
    isEditing: false,
    editableID: ''
  }

  // componentDidMount(): void {
  //     this.props.fetchTodos();
  // }

  handlerFetchTodo = (): void => {
    this.props.fetchTodos();

    console.log(this.props.todos);
    
  };

  handlerAddTodo = (e: React.FormEvent<HTMLFormElement>|React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("clicked");

    // i have to use urlseachparam since I am using encodedurl
    // I am not actually sure why this happened, but  this behavior
    // occurs in postman, and I cant use the form-data, I ben stuck in this part for a long time, so to proceed, I have to use urlencoded for a while
    const params = new URLSearchParams();
    params.append('text', this.state.text);

    params.append('completed', 'false');

    // console.log(params);  
    

    this.props.addTodo(params);
  };

  onTodoClick = (id: string): void => {

    this.props.deleteTodo(id);
  };

  handlerUpdate = (id: string): void => {
     const params = new URLSearchParams();
    params.append('text', this.state.updateText);
    params.append('completed', 'false');
    // console.log(id);
    this.props.updateTodo(id, params);

    this.setState({
      isEditing: false,
      editableID: '',
      updateText: ''
    });
  };

  editState = (id: string, text: string): void => {
    this.setState({
      isEditing: true,
      editableID: id,
      updateText: text
    });
  };

  onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      this.setState({[e.target.name]: e.target.value});

  }

  onInputChangeUpdate = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    this.setState({[e.target.name]: e.target.value});

}

  renderTodoForm(): JSX.Element {
    const {text} = this.state;
    return (
      <div >
        <p>Insert Text</p>
       <form onSubmit={this.handlerAddTodo}>
        <input type="text" name='text' 
        value={text} 
        onChange={this.onInputChange} />
        <button type='submit'>Submit</button>
       </form>
      </div>
    );
  }

  renderTodos(): JSX.Element[] {
    const {isEditing, editableID, updateText} = this.state;
    return this.props.todos.map((todo:Todo)=>{
      return (
        <div  key={todo.id}>
          <div>
            {isEditing&&editableID===todo.id?
              <input type="text" name='updateText' 
                value={updateText} 
                onChange={this.onInputChangeUpdate} />
            :
              <p onClick={()=>{console.log("clicked")}}>{todo.text}</p>
            }
          </div>
          <button onClick={() => this.onTodoClick(todo.id)}>X</button>
          <div>
            {isEditing&&editableID===todo.id?
            <button onClick={() => this.handlerUpdate(todo.id)}>
              submit Update
            </button>
            :
            <button onClick={() =>this.editState(todo.id, todo.text)}>
            edit
          </button> 
            }
          </div>
          
        </div>
    );
    });
  }

  render() {
   

        
    return (
      <div>

        {this.renderTodoForm()}

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