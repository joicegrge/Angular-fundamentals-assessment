# Task Tracker — Angular Fundamentals Assessment

A small single-page application built with **Angular 22** and **standalone components**.
It shows a home page and a task list, and demonstrates the core Angular building blocks:
an injectable service, dependency injection, client-side routing, signals and the modern
template control-flow syntax (`@if`, `@for`, `@switch`).

## Features

- **Home** page (`/`) that summarises progress ("2 of 5 tasks completed") using data from the shared service.
- **Tasks** page (`/tasks`) where you can add a task, click a status badge to cycle it
  (To do → In progress → Done) and remove a task.
- A navigation bar (and a "Go to my tasks" button) to move between the two routes.

## Requirements

- [Node.js](https://nodejs.org/) 20.19+ (or 22+)
- Angular CLI

```bash
# Windows
npm install -g @angular/cli

```

## Setup and run

```bash
git clone https://github.com/<your-username>/angular-assessment.git
cd angular-assessment
npm install
ng serve            # then open http://localhost:4200
```

Other commands:

```bash
ng build            # production build into dist/angular-assessment
ng test             # run the unit tests
```

## Project structure

```
src/
├─ main.ts                        # bootstraps the standalone root component
├─ styles.css                     # global styles
└─ app/
   ├─ app.ts / app.html / app.css # root component: nav bar + <router-outlet>
   ├─ app.config.ts               # application providers (router)
   ├─ app.routes.ts               # route table
   ├─ components/
   │  ├─ home/                    # Home page component
   │  └─ task-list/               # Task list component (control flow)
   ├─ models/
   │  └─ task.model.ts            # Task interface and TaskStatus type
   └─ services/
      └─ task.ts                  # TaskService (@Injectable)
```

## Architecture choices

- **Standalone components** — there are no NgModules. `main.ts` calls `bootstrapApplication(App, appConfig)`
  and each component lists what it needs in its own `imports` array.
- **Separation of concerns** — components (`components/`), data shape (`models/`), shared logic
  (`services/`) and navigation (`app.routes.ts`) each live in their own folder or file.
- **Injectable service + DI** — `TaskService` is decorated with `@Injectable({ providedIn: 'root' })`,
  so there is one app-wide instance. Both `Home` and `TaskList` receive it with `inject(TaskService)`,
  which is why the progress count on Home always matches the list on the Tasks page.
- **Signals** — the service keeps its state in a `signal` and exposes read-only and `computed`
  values (`tasks`, `doneCount`, `total`), so templates update automatically when state changes.
- **Routing** — `app.routes.ts` maps `''` to `Home` and `'tasks'` to `TaskList`, with a wildcard
  redirect to Home. `routerLink` and `routerLinkActive` provide the navigation and active-link highlight.
- **Modern control flow** — `task-list.html` uses `@if` / `@else` (empty state), `@for` with `track`
  and `@empty` (the list), and `@switch` / `@case` (the status badge). `home.html` uses `@if` / `@else` as well.

## Screenshots

### 1. Successful clean build (`ng build`)

<img width="1472" height="367" alt="image" src="https://github.com/user-attachments/assets/97914833-8bbb-4dcb-b5da-528235d03854" />



### 2. Control flow working in the application

The task list is rendered with `@for`, the empty-state is handled with `@if` / `@else`, and
each status badge is chosen with `@switch`. Here a new task was added and a status was changed.

<img width="1600" height="852" alt="image" src="https://github.com/user-attachments/assets/3135c1b5-3698-4130-8f3c-a93c88f1ad6b" />


### 3. After navigating to the second route

Clicking the **Tasks** link in the navigation bar changes the URL to `/tasks` without a page reload.

<img width="1600" height="851" alt="image" src="https://github.com/user-attachments/assets/c99d0b99-ff86-49a3-98f3-c183a2a0c5df" />
