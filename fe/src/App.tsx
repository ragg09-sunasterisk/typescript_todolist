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
    editableID: '',
    // editTodo: []
  }


  componentDidMount(): void {
      this.props.fetchTodos();
      console.log(this.props.todos);
  }

  handlerFetchTodo = (): void => {
    this.props.fetchTodos();
    console.log(this.props.todos);
  };

  handlerAddTodo = (e: React.FormEvent<HTMLFormElement>|React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("clicked");

    // i have to use urlseachparam since I am using encodedurl in my express setup
    const params = new URLSearchParams();
    params.append('text', this.state.text);

    params.append('completed', 'false');

    // console.log(params);  
    

    this.props.addTodo(params);

    
    this.setState({
      text: ''
    });
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

    // this.setState({
    //   editTodo: todo,
    // })

    // console.log(this.state.editTodo);

    

    // console.log(todo);


    

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
      <div className='mt-10 mb-10'>
        <form className="w-full max-w-lg" onSubmit={this.handlerAddTodo}>
          {/* <input type="text" name='text' 
          value={text} 
          onChange={this.onInputChange} /> */}

        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-text-input">
                Insert New Todo
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-text-input" type="text" name='text' 
          value={text} 
          onChange={this.onInputChange} />
              <p className="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
          </div>
          <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
        Add
      </button>
        </form>
      </div>
    );
  }

  renderTodos(): JSX.Element[] {
    const {isEditing, editableID, updateText} = this.state;
    return this.props.todos.map((todo:Todo)=>{
      return (
        <ul className='list-disc' key={todo.id}>
          <li>
          {isEditing&&editableID===todo.id?
              <input type="text" name='updateText' className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                value={updateText} 
                onChange={this.onInputChangeUpdate} />
            :
              <h2 className='font-medium leading-tight text-4xl mt-0 mb-2'>{todo.text}</h2>
            }  
            <div className="flex space-x-3">
            <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => this.onTodoClick(todo.id)}>Del</button>

            {isEditing&&editableID===todo.id?
              <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => this.handlerUpdate(todo.id)}>Update</button>
            :
            <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() =>this.editState(todo.id, todo.text)}>Edit</button>
            }

            
          </div>
            </li>
        </ul>

        // <div  key={todo.id}>
        //   <div>
        //     {isEditing&&editableID===todo.id?
        //       <input type="text" name='updateText' 
        //         value={updateText} 
        //         onChange={this.onInputChangeUpdate} />
        //     :
        //       <p onClick={()=>{console.log("clicked")}}>{todo.text}</p>
        //     }
        //   </div>
        //   <button onClick={() => this.onTodoClick(todo.id)}>X</button>
        //   <div>
        //     {isEditing&&editableID===todo.id?
        //     <button onClick={() => this.handlerUpdate(todo.id)}>
        //       submit Update
        //     </button>
        //     :
        //     <button onClick={() =>this.editState(todo.id, todo.text)}>
        //     edit
        //   </button> 
        //     }
        //   </div>
          
        // </div>
    );
    });
  }

  render() {
   

        
    return (
      <div className='container mx-auto'>

        <h1 className="text-3xl font-bold underline">Todo Checklist</h1>

        {this.renderTodoForm()}

        {/* <button onClick={this.handlerFetchTodo}>Fetch</button> */}

        {/* <button onClick={this.handlerAddTodo}>Add Todo</button> */}
      
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