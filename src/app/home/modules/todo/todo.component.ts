import { Component, effect } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { CommonModule, JsonPipe, KeyValuePipe, NgFor } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

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
    NgFor
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todos = {};
  value = ''
  constructor(private dataService: DataService) {
    effect(() => {
      this.todos = this.dataService.userData().todo;
      console.log(this.todos);
    });
  }

  getName(subitem:any){
    return subitem?.name
  }

  addTodoList() {}

  addTodo(list: Array<object>, value: string) {
    list.push(
      {date: new Date(),
        name: value
      }
    )
    const obj = {
      todo: this.todos,
    };
    this.dataService.updateData(obj);
  }
}
