import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { VarietyService } from "./variety.services";
import { AuthGuard } from "@nestjs/passport";
import { CreateVarietyDto, UpdateVarietyDto } from "./dto/variety.dto";
import { AdminGuard } from "src/auth/admin.gaurd";

@UseGuards(AuthGuard('jwt'),AdminGuard)
@Controller('/variety')

export class VarietyController{
  constructor(private varietyService : VarietyService) {}

  @Post('/create')
  
  signUp(@Body()  createVarietyDto: CreateVarietyDto){
    return this.varietyService.create(createVarietyDto);
  }

  @Get('/all')
  findAll(){
    return this.varietyService.findAll()
  }
  
  @Get('/:id')
  findOne(@Param('id') id:number){
    return this.varietyService.findOne(id)
  }

  @Put('/:id')
 
  update(@Param('id',ParseIntPipe) id: number, @Body() updateVarietyDto: UpdateVarietyDto) {
    return this.varietyService.update(id, updateVarietyDto);
  }

  @Delete('/:id')
  remove(@Param('id') id:number){
    return this.varietyService.remove(id)
  }
}

