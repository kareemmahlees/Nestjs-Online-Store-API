import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
    for (let i = 0; i < 10; i++) {
        await prisma.product.create({
            data: {
                name: faker.commerce.product(),
                amount: parseInt(faker.random.numeric(2)),
                price: faker.finance.amount(),
            },
        });
    }
    await prisma.user.create({
        data: {
            name: 'adminuser',
            email: 'adminuser@gmail.com',
            password: 'password123',
            role: 'Admin',
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
