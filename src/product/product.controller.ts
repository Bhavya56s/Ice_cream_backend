import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/product.dto";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('product')


export class  ProductController{
  constructor(private productService : ProductService) {}

  @Post('/create')
  
  signUp(@Body()  createProductDto: CreateProductDto){
    return this.productService.create(createProductDto);
  }

  @Get('/all')
 
  findall(){
    return this.productService.findall();
  }

  @Get('/:id')

  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Put('/:id')
 
  update(@Param('id') id: number, @Body() updateProductDto: CreateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('/:id')

  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
  
}