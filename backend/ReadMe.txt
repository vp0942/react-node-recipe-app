https://www.youtube.com/watch?v=5wwaQ4GiSNU

nvm use 20.11.1

backend: http://localhost:5000/api/recipes/search?searchTerm=burgers&page=1

mkdir backend
cd backend
npm init // entry point - ./src/index.ts
npm i express prisma @prisma/client cors dotenv
npm i ts-node typescript nodemon @types/node @types/express @types/cors --save-dev
npm run start // "start": "npx nodemon"