import { Injectable, computed, signal } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  'todo': 'in-progress',
  'in-progress': 'done',
  'done': 'todo',
};

/**
 * Holds the task list for the whole app. `providedIn: 'root'` registers it
 * with the application injector, so every component shares one instance.
 */
@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly _tasks = signal<Task[]>([
    { id: 1, title: 'Install the Angular CLI', status: 'done' },
    { id: 2, title: 'Create a standalone Angular app', status: 'done' },
    { id: 3, title: 'Add a service and inject it', status: 'in-progress' },
    { id: 4, title: 'Configure two routes', status: 'in-progress' },
    { id: 5, title: 'Push the project to GitHub', status: 'todo' },
  ]);

  readonly tasks = this._tasks.asReadonly();
  readonly doneCount = computed(
    () => this._tasks().filter((t) => t.status === 'done').length,
  );
  readonly total = computed(() => this._tasks().length);

  add(title: string): void {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }
    const nextId = Math.max(0, ...this._tasks().map((t) => t.id)) + 1;
    this._tasks.update((list) => [...list, { id: nextId, title: trimmed, status: 'todo' }]);
  }

  cycleStatus(id: number): void {
    this._tasks.update((list) =>
      list.map((t) => (t.id === id ? { ...t, status: NEXT_STATUS[t.status] } : t)),
    );
  }

  remove(id: number): void {
    this._tasks.update((list) => list.filter((t) => t.id !== id));
  }
}
