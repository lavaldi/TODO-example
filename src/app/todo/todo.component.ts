import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'pr-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  private todos;
  private activeTasks;
  private newTodo;
  private path;

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  addTodo(){
    this.todoService.add({ _id: this.todos.length + 1, title: this.newTodo, isDone: false }).then(() => {
      return this.getTodos();
    }).then(() => {
      this.newTodo = ''; // clear input form value
    });
  }

  updateCheck(todo, checkValue) {
    todo.isDone = checkValue;
    return this.todoService.putCheck(todo).then(() => {
      return this.getTodos();
    });
  }

  updateTitle(todo, newValue) {
    todo.title = newValue;
    return this.todoService.put(todo).then(() => {
      todo.editing = false;
      return this.getTodos();
    });
  }

  destroyTodo(todo){
    this.todoService.destroy(todo._id).then(() => {
      return this.getTodos();
    });
  }

  clearCompleted() {
    this.todoService.deleteCompleted().then(() => {
      return this.getTodos();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params["status"];
      this.getTodos(this.path);
    });
  }

  getTodos(query = ""){
    return this.todoService.get(query).then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => todo.isDone).length;
    });
  }

}
