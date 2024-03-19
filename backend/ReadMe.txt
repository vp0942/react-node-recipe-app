https://www.youtube.com/watch?v=5wwaQ4GiSNU

nvm use 20.11.1

backend: http://localhost:5000/api/recipes/search?searchTerm=burgers&page=1

mkdir backend
cd backend
npm init // entry point - ./src/index.ts
npm i express prisma @prisma/client cors dotenv
npm i ts-node typescript nodemon @types/node @types/express @types/cors --save-dev
npm run start // "start": "npx nodemon"

npx prisma init

      ✔ Your Prisma schema was created at prisma/schema.prisma
        You can now open it in your favorite editor.

      warn Prisma would have added DATABASE_URL but it already exists in .env
      warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

      Next steps:
      1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
      2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
      3. Run prisma db pull to turn your database schema into a Prisma schema.
      4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

      More information in our documentation:
      https://pris.ly/d/getting-started


npx prisma db push

      Environment variables loaded from .env
      Prisma schema loaded from prisma/schema.prisma
      Datasource "db": PostgreSQL database "fxqshyyx", schema "public" at "ziggy.db.elephantsql.com"

      🚀  Your database is now in sync with your Prisma schema. Done in 9.10s

      ✔ Generated Prisma Client (v5.11.0) to ./node_modules/@prisma/client in 51ms

npx prisma studio // http://localhost:5555/

npx prisma migrate dev --name init

      Environment variables loaded from .env
      Prisma schema loaded from prisma/schema.prisma
      Datasource "db": PostgreSQL database "fxqshyyx", schema "public" at "ziggy.db.elephantsql.com"

      ✔ No new schema changes were found
      ✔ The database is in sync with the schema
      ✔ The migration `20211119164647_init` has been applied

      Your database is now in sync with your schema.

      ✔ Generated Prisma Client (v5.11.0) to ./node_modules/@prisma/client in 51ms

      The following migration(s) have been applied:
        migrations/
          └─ 20211119164647_init/
            └─ migration.sql

      ✔ The database is now in sync with the schema

      We recommend that you check the generated Prisma Client to see if the changes are reflected in the code. You can also open the database with Prisma Studio to browse the data.

      Next steps:
      1. You can now start using your Prisma Client in your application to access your database.

      More information in our documentation:
      https://pris.ly/d/client

