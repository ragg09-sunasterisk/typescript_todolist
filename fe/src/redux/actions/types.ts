import { FetchTodoAction, DeleteTodoAction, AddTodoAction, UpdateTodoAction } from "./todos";

export enum ActionTypes{
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo
}

export type TodosAction = FetchTodoAction | DeleteTodoAction | AddTodoAction | UpdateTodoAction;



