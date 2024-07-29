import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entity/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product)
  private productRepository:Repository<Product>,
){}

async create(createProductDto:CreateProductDto):Promise<{message:string}>{

  const {name} = createProductDto;
  const product = this.productRepository.create({name})

  const products =await this.productRepository.save(product);
  if(!products){
    throw new NotFoundException(`Product not created`);
 }
 
  return {
    message:`${products.name} sucesfully created`
  }
}

async findall():Promise<Product[]>{
  return this.productRepository.find();
}


async findOne(id: number): Promise<Product> {
  const product = await this.productRepository.findOne({
    where: { id }, 
  });
  if (!product) {
    throw new NotFoundException(`Product with ID ${id} not found`);
  }
  return product;
}


async update(id: any, updateProductDto: CreateProductDto): Promise<Product> {
  const product = await this.productRepository.update(id, updateProductDto);
  if(!product){
    throw new NotFoundException(`Product with ID ${id} not found`)
   }
  return this.findOne(id);
}


async remove(id: any): Promise<{message:string}> {
 const product = await this.productRepository.delete(id);

 if(!product){
  throw new NotFoundException(`Product with ID ${id} not found`)
 }

  return {message:`Succesfully delete`}
}
}