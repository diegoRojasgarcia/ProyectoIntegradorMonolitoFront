FROM node:20

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV REACT_APP_GRAPHQL_URL=host.docker.internal:8000/graphql

RUN npm run

EXPOSE 3001

CMD ["npm","run","dev"]