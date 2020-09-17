FROM node:latest

RUN mkdir -p /home/shop_admin_panel

WORKDIR /home/shop_admin_panel

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000 

CMD ["yarn", "start"]