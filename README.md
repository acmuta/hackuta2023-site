# HackUTA 2023 website

Built with Next.js v13 `app/` directory and React Server Components.

## Development

* `git clone`
* Create `.env.local` with content from [secret Discord thread](https://discord.com/channels/1065710827484745829/1074431163227189329/1074473411969044500)
* `npm i`
* `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
If port 3000 is already taken, use `npx kill-port 3000` to terminate the process that occupies the port if desired.

Before commit,

* `npm run lint:fix` fixes all **lint** and **formatting** errors. 
* `npm run fmt` fixes **formatting** errors only (cuz ESLint is hella slow).
* `npm run lint` checks for **lint** and **formatting** errors without fixing them. This is included in a pre-commit hook and is executed automatically when you use `git commit` or equivalent

## Deployment

* `git clone --depth=1 --branch=build`
* Create `.env.local` with relevant variables.
* `npm install`
* `npm run build`
* `npm start -p <port>`

## Architecture

All incoming request first go through the `middleware.ts`.

The middleware does the following:

* Add `x-middleware-session` header storing information about the current user and their privileges.
* Rewrite to relevant error pages when user is not authenticated/authorized.

The routes are written with the following ideas in mind:

* Prefer using server components
* Prefer fetching data on the server side
