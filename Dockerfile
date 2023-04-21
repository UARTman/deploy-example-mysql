FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

ENV HOST=0.0.0.0

CMD ["sh", "./start.sh"]
