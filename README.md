# Angular Dashboard

Angular 21 project with a responsive dashboard shell, typed API services, and polished data workflows.

## Tech Stack

- Angular 21
- Angular Material 21
- TypeScript 5.9
- RxJS 7

## Features

- Responsive dashboard layout with side navigation
- Users module
- Search + pagination table
- User details modal
- Create user reactive form
- Posts module
- Search + pagination table
- Create post reactive form
- Loading, error, and empty states for data views
- VS Code debug configuration (`.vscode/launch.json`, `.vscode/tasks.json`)

## Run Locally

```bash
npm install
npm start
```

App runs at `http://localhost:4200`.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Project Structure

- `src/app/app.component.*`: app shell and navigation
- `src/app/home-page/*`: landing/overview section
- `src/app/user-module/*`: users table, forms, dialogs, API service
- `src/app/post-module/*`: posts table, forms, dialogs, API service

## APIs Used

- `https://jsonplaceholder.typicode.com`
- `https://reqres.in`
