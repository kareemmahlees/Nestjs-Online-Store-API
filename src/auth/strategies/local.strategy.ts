import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"
import { PrismaService } from "src/database/prisma.service";
import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { UnauthorizedException } from "@nestjs/common/exceptions";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
    constructor(private readonly prisma: PrismaService) {
        super({
            usernameField: "email",
            passwordField: "password"
        })
    }

    async validate(username: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: username,
            }
        })
        if (!user) {
            throw new UnauthorizedException("Incorrect Email")
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException("Incorrect Password")
        }

        delete user.password
        return user
    }


}