import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    cleandb() {
        return this.$transaction([
            this.user.deleteMany(),
            this.product.deleteMany(),
        ]);
    }
}
