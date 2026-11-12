import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { TaskList } from './components/task-list/task-list';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home | Task Tracker' },
  { path: 'tasks', component: TaskList, title: 'Tasks | Task Tracker' },
  { path: '**', redirectTo: '' },
];
