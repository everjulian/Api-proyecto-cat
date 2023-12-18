import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UptadeUserDTO } from "./dto/update-user.dto";
import { CreateUserDTO } from "./dto/create-users.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard"; 

@ApiBearerAuth()
@ApiTags('users')

@Controller('users')
export class UserController{
      constructor(private readonly userService:UserService){
      }
    @ApiOperation({description:'Buscar ', summary:'Find Users'})
    
    @Get()
    async find(@Query() query:any ){
        const response = await this.userService.find();
        return response
    }

    @ApiOperation({description:'Buscar por id', summary:'Find One User'})
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id:number){
        const response = await this.userService.findOne(id);

        return response;
    }

    @ApiOperation({description:'Agregar ', summary:'Add User'})
    @Post()
    async create(@Body() payload: CreateUserDTO){
        const response = await this.userService.create(payload);
        return response;
    }

    @ApiOperation({description:'Editar ', summary:'Update Users'})
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() payload:UptadeUserDTO){
        const response = await this.userService.update(id, payload);
        return {id, body:payload}
    }

    @ApiOperation({description:'Eliminar', summary:'Delete Users'})
    @Delete(':id')
    async delete(@Param('id') id:number){
        const response = await this.userService.delete(id);

        return response;
    }

    
}