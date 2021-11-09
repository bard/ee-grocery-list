## Execution

30min API, 90min frontend, **not** including thinking through the architecture, writing down notes and README, and adding scripts to run the project on machines without Docker.

## Important things left out

Search for "todo" (case-insensitive) under `services/` or run the following:

```sh
grep -ri todo services/{frontend,api}/src
```

## Architecture

Criteria:

- In the absence of information about the hypothetical team that would continue the work, pick technologies that are familiar to most or (as long as the upside is significant) tech that are based upon _concepts_ that are familiar to most; rule out tech that is unfamiliar in both concepts and mechanics.
- Pick an architecture that supports (or at least allows introducing support for) situations important to this type of application: resilience in the face of unstable internet connection, offline support, multi-device support.

Solutions considered:

- **[CHOSEN]** local client state + bulk server sync + REST API. **Pros**: familiar to most developers; network resilient (won't stop working while in a badly covered corner of the supermarket, as long as the page isn't reloaded); simplifies backend; with relative ease, can be made offline capable (localStorage) and multi-device (last-modified-wins conflict handling). **Cons**: coarse and wasteful network sync (can be optimized with debouncing and onBeforeUnload check); no easy path to multi-user with concurrent editing.
- [PostGraphile](https://www.graphile.org/postgraphile/) + [urql](https://formidable.com/open-source/urql/). **Pros**: automatically generated statically typed API and documentation (less to write, less to test, less to break); battle-tested persistence solution (Postgres); offline capable; sufficient experience on my side; keeps data operations close to data. **Cons**: takes hours to set up; requires downstream team to be confident with SQL.
- REST API + [react-query](https://react-query.tanstack.com/). **Pros**: familiar concepts; hard problems of managing remote state (optimistic updates, caching, invalidation) neatly encapsulated in a library. **Cons**: never used it for network-resilient code so excessive risk; true offline support missing.
- [AutoMerge](https://github.com/automerge/automerge). **Pros**: offline support; transparent client/server as well as client/client sync. **Cons**: high voodoo factor; not enough experience on my side to foresee limitations in the case of evolving requirements.

## Boilerplate

Based on my personal starter for monorepos. In turn based on [my node project starter](https://github.com/bard/starter-node-basic) (API) and a [Vite scaffold](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) plus [Chakra UI](https://chakra-ui.com/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/) (frontend).
