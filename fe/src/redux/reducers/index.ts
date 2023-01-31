import {combineReducers} from 'redux';
import { todosReducer } from './todos';
import { Todo } from '../actions';

/*
    FEATURE
    optional validator for store strcuture
    this interface make sure that every
    properties in the combineReducers
    return the same properties of the 
    interface used in the StoreState interface
    e.g.
        todos: todosReducer
        todosReducer must be a type of Todo[]
*/
export interface StoreState {
    todos: Todo[]
}

export const reducers = combineReducers<StoreState>({
    todos: todosReducer

})