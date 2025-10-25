# CLI commands
```npm run dev``` run development server at port 3000
```npm run build``` local production build
```npm run start``` run built server
```npm run lint``` lints using eslint and prettier
```npm run lint:fix``` lint and fix
```npm run test``` creates local sqlLite db and seeds using test-seed.ts then runs jest test suite
```npm run studio``` launch prisma studio
```npm run studio:test``` launch prisma studio for test database

# Architecture

## Database
Prisma

## Headless CMS and document CDN
Sanity.io
Sanity studio deployed with schemas in mkj-studio. Studio deployed to sanity's infrastructure

## Component library
@danwilson282/mkj-component-library
Components stored in private library, all functional tests and unit tests for frontend logic contained in this repo
```npm i @danwilson282/mkj-component-library``` to update the package

## Automated testing
Jest tests for database logic and backend helper functions contained in this repo

## Documentation
Markdown documents and mermaid.js diagrams
/docs
