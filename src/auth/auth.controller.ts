import {
    Body,
    Controller,
    Post,
    Request,
    Get,
    HttpCode,
    Delete,
    Put,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { localAuthGuard } from './guards/auth.guard';
import { AuthPipe } from './pipes/auth.pipe';
import { AuthService } from './auth.service';
import { RegisterUserDTO, UpdateProfile } from './dto';
import { JwtGuard } from './guards/jwt.guard';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body(new AuthPipe()) payload: RegisterUserDTO) {
        return this.authService.registerUser(payload);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(localAuthGuard)
    async login(@Request() req) {
        return this.authService.loginUser(req.user);
    }

    @HttpCode(HttpStatus.OK)
    @Get('profile')
    @UseGuards(JwtGuard)
    async profile(@Request() req) {
        return req.user;
    }

    @HttpCode(HttpStatus.OK)
    @Get('logout')
    @UseGuards(JwtGuard)
    async logout() {
        return { msg: 'Successfuly logged out ' };
    }

    @HttpCode(HttpStatus.OK)
    @Put('update-profile')
    @UseGuards(JwtGuard)
    async update_profile(@Request() req, @Body() updateData: UpdateProfile) {
        return this.authService.updateProfile(req.user.id, updateData);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete-profile')
    @UseGuards(JwtGuard)
    async delete_profile(@Request() req) {
        return this.authService.deleteUserAccount(req.user.id);
    }
}
