FROM node:22.14.0-alpine
WORKDIR /app
COPY package.json ./
RUN corepack enable
RUN corepack prepare pnpm@9.1.4 --activate
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]