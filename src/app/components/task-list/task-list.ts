import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  protected readonly taskService = inject(TaskService);

  addTask(input: HTMLInputElement): void {
    this.taskService.add(input.value);
    input.value = '';
    input.focus();
  }
}
