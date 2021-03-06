import { Injectable } from '@angular/core';

let todos = [
  { _id: 1, title: "Install Angular CLI", isDone: true },
  { _id: 2, title: "Style App", isDone: true },
  { _id: 3, title: "Finish Service Functionality", isDone: false},
  { _id: 4, title: "Setup API", isDone: false },
];

@Injectable()
export class TodoService {

  constructor() { }

  get(query=""){
    return new Promise(resolve => {
      var data;

      if (query === "completed" || query === "active") {
        var isCompleted = query === "completed";
        data = todos.filter(todo => todo.isDone === isCompleted);
      } else {
        data = todos;
      }
      resolve(data);
    });
  }

  add(data){
    return new Promise(resolve => {
      todos.push(data);
      resolve(data);
    });
  }

  put(data) {
    return new Promise(resolve => {
      let index = todos.findIndex(todo => todo._id === data._id);
      todos[index].title = data.title;
      resolve(data);
    });
  }

  putCheck(data) {
    return new Promise(resolve => {
      let index = todos.findIndex(todo => todo._id === data._id);
      todos[index].isDone = data.isDone;
      resolve(data);
    });
  }

  destroy(id) {
    return new Promise(resolve => {
      let index = todos.findIndex(todo => todo._id === id);
      todos.splice(index, 1);
      resolve(true);
    });
  }

  deleteCompleted() {
    return new Promise(resolve => {
      todos = todos.filter(todo => !todo.isDone);
      resolve(todos);
    });
  }
}
