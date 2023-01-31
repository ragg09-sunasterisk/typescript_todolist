import { Todo, TodosAction, ActionTypes } from "../actions"




/*
    state: Todo[], making sure that the state
    is an array of Todo objects
*/
export const todosReducer = (
    state: Todo[] = [], 
    action: TodosAction) =>{
        switch (action.type) {
            case ActionTypes.fetchTodos:
                return action.payload;
            case ActionTypes.addTodo:
                return action.payload;
            case ActionTypes.updateTodo:
                return action.payload;
            case ActionTypes.deleteTodo:
                return state.filter(todo => todo.id !== action.payload);
            default:
                return state;
        }
}