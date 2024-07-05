FROM node:18-alpine AS base

FROM base AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /server

RUN apk add curl
RUN curl -L https://unpkg.com/@pnpm/self-installer | node

ENV SHELL=/bin/bash

RUN pnpm setup
RUN pnpm init

ENV PNPM_HOME=/usr/local/bin

RUN pnpm install turbo --global

COPY . .

RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /server

RUN apk add curl
RUN curl -L https://unpkg.com/@pnpm/self-installer | node
ENV SHELL=/bin/bash
RUN pnpm setup
ENV PNPM_HOME=/usr/local/bin

RUN pnpm install turbo --global

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /server/out/json/ .
COPY --from=builder /server/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Build the project and its dependencies
COPY --from=builder /server/out/full/ .
COPY turbo.json turbo.json

RUN pnpm install

RUN turbo build --filter=@saas-monorepo/database
RUN turbo build --filter=api

# Add the migration command here
# This will run the migration during the build process
ARG DATABASE_URL
RUN cd packages/database && npx prisma migrate deploy

FROM base AS runner

WORKDIR /server

RUN mkdir -p /server/apps/api/dist/uploads
RUN chown -R 1001:1001 /server/apps/api/dist/uploads

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify

USER fastify

COPY --from=installer /server .

EXPOSE 8000

CMD ["sh", "-c", "npx prisma migrate deploy && node apps/api/dist/index.js"]
