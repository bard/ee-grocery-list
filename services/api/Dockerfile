FROM node:16-alpine AS builder
WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn install --cache-folder /tmp/cache --frozen-lockfile && rm -rf /tmp/cache
COPY ./ ./
RUN yarn test && yarn build

FROM node:16-alpine
WORKDIR /app/services/api
COPY --from=builder /build/dist dist/
COPY ./ ./
RUN yarn install --prod --cache-folder /tmp/cache --frozen-lockfile && rm -rf /tmp/cache
CMD ["yarn", "start:prod"]

