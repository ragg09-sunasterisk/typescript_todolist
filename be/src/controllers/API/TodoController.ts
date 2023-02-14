import { Request, Response, } from "express";
import { get, post, put, del, controller, bodyValidator } from "./../decorators";


type RequestBody = {text: string};
type RequestId = {id: string};

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

let todos: Todo[] = [
    {
        id: new Date().toISOString(),
        text: "First todo item API",
        completed: true,
    }
];

// //=========================================================
// // just to have initial data 
// const newTodoFirst:Todo = {
//     id: new Date().toISOString(),
//     text: "First todo item",
//     completed: true,
// }
// // push/add data in array
// todos.push(newTodoFirst);
// //=========================================================


@controller("/api/todo")
class TestAPIController{

    
    @get('/')
    getTodos(req : Request, res: Response) {
        res.status(200).json(todos);
    }

    @post('/')
    addTodo(req : Request, res: Response) {

        const {text, completed} = req.body;

        const newTodo:Todo = {
            id: new Date().toISOString(),
            text: text,
            completed: completed,
        }

        // push/add data in array
        todos.push(newTodo);

        return res.status(201).json({
            message: 'Added Successfully',
            todo: newTodo,
            todos: todos,
        });
        

    }

    @put('/:id')
    updateTodo(req : Request, res: Response) {
        const params = req.params as RequestId;
        const todo_id = params.id;
        const body = req.body as RequestBody;
        
        // map todos[] to fin the requested ID
        const todoIndex = todos.findIndex(t => t.id === todo_id);
        if(todoIndex >= 0){
            todos[todoIndex] = {
                id: todos[todoIndex].id,
                text: body.text, 
                completed: req.body.completed,
            }
    
            return res.status(201).json({message: 'Updated Successfully', todo: todos[todoIndex], todos: todos });
        }
    
        res.status(404).json({ message: "Todo not found."});
    }

    @del('/:id')
    deleteTodo(req : Request, res: Response) {
        const params = req.params as RequestId;
        const todo_id = params.id;
    
        todos = todos.filter(t => t.id !== todo_id);
    
        res.status(201).json({
            message: 'Deleted Successfully',
            todos: todos,
        });
    }
    

    
}