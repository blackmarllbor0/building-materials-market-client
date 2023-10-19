FROM node:14

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY .env ./

COPY . .

RUN npm install -g typescript @quasar/cli

RUN npm install

RUN npm uninstall '@storybook/*' storybook

CMD [ "npm", "run", "dev" ]
