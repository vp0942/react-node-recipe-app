https://www.youtube.com/watch?v=5wwaQ4GiSNU

nvm use 20.11.1

frontend: http://localhost:5173/

mkdir frontend
cd frontend
npm vite@latest // project name: frontend, React->TypeScript + SWC
npm install
npm run dev

npx prisma init // to create prisma folder

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started

npm i react-icons

