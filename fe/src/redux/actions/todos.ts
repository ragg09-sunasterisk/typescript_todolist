import axios from 'axios';
import { ActionTypes } from './types';

/* since we a re using TS, dispatch should have a type signature
   >> import { Dispatch } from 'redux'; <<
   it is already in redux, just import it
   and make it as an annotation to your dispatch
*/
import { Dispatch } from 'redux';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

// for fetchTodos action (dispatch)
export interface FetchTodoAction{
    type: ActionTypes.fetchTodos
    payload: Todo[];
}

// for deleteTodo action (dispatch)
export interface DeleteTodoAction{
    type: ActionTypes.deleteTodo
    payload: string;

}


// for addTodo action (dispatch)
export interface AddTodoAction{
    type: ActionTypes.addTodo
    payload: any;

}

// for updateTodo action (dispatch)
export interface UpdateTodoAction{
    type: ActionTypes.updateTodo
    payload: any;

}



const todoURL = 'http://localhost:3000/api/todo'

// const todoURL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = () => {
    return async(dispatch:Dispatch) => {
        /*
            get method assume any data,
            to prevent that, we will use interface
            to define what data it should return.
            By adding <Todo[]> as its generic,
            this get method now expect an array of data
            that satisfy the interface
        */
        const res = await axios.get<Todo[]>(todoURL);


        /*
            this is actually optional,
            but the point of putting generic to this action is
            to make sure that the dispatch action will only satisfy 
            the generic interface, the goal is to make sure that
            the action object has the correct properties and type.
            Additionally, it provideds type safety.
        */
        dispatch<FetchTodoAction>({
            type: ActionTypes.fetchTodos,
            payload: res.data
        })
    };
};

// to be fixed
export const addTodo = (data: Todo) => {
    return async(dispatch:Dispatch) => {
        const res = await axios.post(todoURL, data);

        dispatch<AddTodoAction>({
            type: ActionTypes.addTodo,
            payload: res.data.todos
        })
    };
};

// to be fixed
export const updateTodo = (id: string, data: Todo) => {
    return async(dispatch:Dispatch) => {
        const res = await axios.put(todoURL+"/"+id, data);

        dispatch<AddTodoAction>({
            type: ActionTypes.addTodo,
            payload: res.data.todos
        })
    };
};

export const deleteTodo = (id: string): DeleteTodoAction => {
    return{
        type: ActionTypes.deleteTodo,
        payload: id
    }
}


