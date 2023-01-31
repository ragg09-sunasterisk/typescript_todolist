"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
var todos = [
    {
        id: new Date().toISOString(),
        text: "First todo itemasd",
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
var TestAPIController = /** @class */ (function () {
    function TestAPIController() {
    }
    TestAPIController.prototype.getTodos = function (req, res) {
        res.status(200).json(todos);
    };
    TestAPIController.prototype.addTodo = function (req, res) {
        var _a = req.body, text = _a.text, completed = _a.completed;
        var newTodo = {
            id: new Date().toISOString(),
            text: text,
            completed: completed,
        };
        // push/add data in array
        todos.push(newTodo);
        return res.status(201).json({
            message: 'Added Successfully',
            todo: newTodo,
            todos: todos,
        });
    };
    TestAPIController.prototype.updateTodo = function (req, res) {
        var params = req.params;
        var todo_id = params.id;
        var body = req.body;
        // map todos[] to fin the requested ID
        var todoIndex = todos.findIndex(function (t) { return t.id === todo_id; });
        if (todoIndex >= 0) {
            todos[todoIndex] = {
                id: todos[todoIndex].id,
                text: body.text,
                completed: req.body.completed,
            };
            return res.status(201).json({ message: 'Updated Successfully', todo: todos[todoIndex], todos: todos });
        }
        res.status(404).json({ message: "Todo not found." });
    };
    TestAPIController.prototype.deleteTodo = function (req, res) {
        var params = req.params;
        var todo_id = params.id;
        todos = todos.filter(function (t) { return t.id !== todo_id; });
        res.status(201).json({
            message: 'Deleted Successfully',
            todos: todos,
        });
    };
    __decorate([
        (0, decorators_1.get)('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TestAPIController.prototype, "getTodos", null);
    __decorate([
        (0, decorators_1.post)('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TestAPIController.prototype, "addTodo", null);
    __decorate([
        (0, decorators_1.put)('/:id'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TestAPIController.prototype, "updateTodo", null);
    __decorate([
        (0, decorators_1.del)('/:id'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TestAPIController.prototype, "deleteTodo", null);
    TestAPIController = __decorate([
        (0, decorators_1.controller)("/api/todo")
    ], TestAPIController);
    return TestAPIController;
}());
