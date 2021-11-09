## Intro

This repo contains a solution to the [grocery list tech test](https://equalexperts.github.io/ee-tech-interviews-uk/grocery-list-problem.html), rev 5b8d0fd276b6d288905ed2f63a934e057e8feca2 ([local
copy](./docs/grocery-list-problem.md)).

Notes regarding architecture choices and how the test was conducted are in [docs/notes.md](./docs/notes.md).

## Run in dev

```sh
yarn install:all
```

With docker-compose (recommended):

```sh
yarn start:dev:docker
```

Then open http://myapp.127-0-0-1.nip.io in a browser.

Without docker-compose:

```sh
yarn start:dev:api &
yarn start:dev:frontend
```

Then open http://localhost:3000 in a browser.

## Run tests

```sh
yarn test
```

## Run in prod

1. Build Docker images with provided Dockerfiles in `services/frontend` and `services/api`
2. Feed container orchestrator of choice
3. Route `/api` to the `api` container, port 3000
4. Route `/*` to the `frontend` container, port 3000
