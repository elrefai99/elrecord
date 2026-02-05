# Prisma
- is a ORM Database, it is a tool that help you to interact with your database in a type-safe way.

## why use prisma?
- it is a type-safe ORM
- easy to use
- it faster
- similar with MongoDB and PostgreSQL

## how to use prisma?
- first you need to install prisma
```bash
npm install prisma --save-dev
```
- then you need to generate the prisma client
```bash
npx prisma generate
```
- then you can use the prisma client
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
     const user = await prisma.user.create({
          data: {
               name: 'John Doe',
               email: [EMAIL_ADDRESS]',
          },
     })
     console.log(user)
}

main()
     .catch((e) => {
          console.error(e)
          process.exit(1)
     })
     .finally(async () => {
          await prisma.$disconnect()
     })
```
