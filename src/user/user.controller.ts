import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    ForbiddenException,
    UseFilters,
    Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
// import { AbilityFactory, Action } from 'src/ability/ability.factory';
import { ForbiddenError } from '@casl/ability';
// import { AbilityGuard } from 'src/ability/guards/ability.guard';
// import { CheckAbilites } from 'src/ability/decorators/ability.decorator';
// import { AbilityFilter } from 'src/ability/ability.filter';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { AssignedRoles } from 'src/roles/roles.enum';

@UseGuards(JwtGuard, RolesGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) // private readonly abilityService: AbilityFactory,
    {}

    @Get()
    // @UseFilters(AbilityFilter)
    // @UseGuards(AbilityGuard)
    // @CheckAbilites({ action: Action.Read, subject: 'all' })
    @Roles(AssignedRoles.Admin)
    async findAll(@Request() req) {
        return await this.userService.findAll();
    }

    @Get(':id')
    @Roles(AssignedRoles.Admin)
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    @Roles(AssignedRoles.Admin)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @Roles(AssignedRoles.Admin)
    async remove(@Param('id') id: string) {
        await this.userService.remove(id);
    }
}
