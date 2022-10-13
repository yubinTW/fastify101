# Stage-1 for build
FROM node:18.10.0 as builder

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# Stage-2 for deployment
FROM node:18.10.0-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json .
RUN npm install --omit=dev

CMD npm run start