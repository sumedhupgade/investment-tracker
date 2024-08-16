import { Component, effect } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { CommonModule, JsonPipe, KeyValuePipe } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

interface Todo {
  name: string;
  date: Date;
  urgency: string;
  addedBy: string;
}
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    JsonPipe,
    KeyValuePipe,
    FloatLabelModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todos: Array<Todo> = [];
  priority = [{ name: 'urgent' }, { name: 'not-urgent' }];
  selectedPriority = { name: 'urgent' };
  value = '';
  constructor(private dataService: DataService) {
    effect(() => {
      this.todos = this.dataService.userData().todo;
      console.log(this.todos);
    });
  }

  getName(subitem: any) {
    return subitem?.name;
  }

  addTodoList() {}

  addTodo(value: string) {
    this.todos.push({
      date: new Date(),
      name: value,
      addedBy: '',
      urgency: this.selectedPriority.name,
    });
    this.value = '';
    this.selectedPriority = { name: 'urgent' };
    const obj = {
      todo: this.todos,
    };
    this.dataService.updateData(obj);
  }

  markAsDone(index: number) {
    this.todos.splice(index, 1);
    const obj = {
      todo: this.todos,
    };
    this.dataService.updateData(obj);
  }
}
