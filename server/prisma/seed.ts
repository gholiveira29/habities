import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.habit.deleteMany();
    await prisma.habit.create({
        data: {
            titles: "Comer direito",
            created_at: new Date('2023-02-01T00:00:00.00z')
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })