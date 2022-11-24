import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport"
import { JwtStrategy } from "../strategies/jwt.strategy";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") { }