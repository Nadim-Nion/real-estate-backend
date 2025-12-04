# Credentials

- User

```bash
email: cricketnion1234@gmail.com
password: 12345678
```

-Admin

```bash
email: nadimmahmud.webdev@gmail.com
password: 12345678
```

# Resources

[Loom Video](https://www.loom.com/share/35c6b9ff81d74395ae494043949f5f7f)

# Description

backend created using nestjs

## Config

Stripe webhook:

```
http://{domain_name}/api/payment/stripe/webhook
```

for development run stripe cli:

```
stripe listen --forward-to localhost:4000/api/payment/stripe/webhook
```

trigger a event for testing:

```
stripe trigger payment_intent.succeeded
```

## Installation

Install all dependencies

```
yarn install
```

## Setup

Copy .env.example to .env and config according to your needs.

Migrate database:

```bash
npx prisma migrate dev
```

Seed dummy data to database

```
yarn cmd seed
```

## Running:

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod

# watch mode with swc compiler (faster)
yarn start:dev-swc
```

For docker:

```
docker compose up
```

## Api documentation

Swagger: http://localhost:4000/api/docs

## Tech used

- Typescript
- Nest.js
- Prisma
- Postgres
- Socket.io
- Bullmq
- Redis
- etc.
