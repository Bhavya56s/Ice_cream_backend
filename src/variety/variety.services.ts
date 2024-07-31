import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Variety } from "./entity/variety.entity";
import { CreateVarietyDto, UpdateVarietyDto } from "./dto/variety.dto";
import { Product } from "src/product/entity/product.entity";

@Injectable()
export class VarietyService {
  constructor(@InjectRepository(Variety)
  private varietyRepository:Repository<Variety>,
  @InjectRepository(Product)
  private productRepository: Repository<Product>,
){}


  async create(createVarietyDto:CreateVarietyDto):Promise<{message:string}>{

    const {product_id} = createVarietyDto

    const product = await this.productRepository.findOne({ where: { id: product_id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }

    const variety = this.varietyRepository.create({...createVarietyDto,product})
    const varieties =await this.varietyRepository.save(variety);
    if(!varieties){
      throw new NotFoundException(`Product not created`);
   }
   
    return {
      message:`${variety.name} sucesfully created`
    }
   
  }

  async findAll():Promise<Variety[]>{
    return this.varietyRepository.find( //{ relations: ['product'] }
      );
  }

  async findOne(id: number): Promise<Variety> {
    const variety = await this.varietyRepository.findOne({
      where: { id }, 
    });
    if (!variety) {
      throw new NotFoundException(`Variety with ID ${id} not found`);
    }
    return variety;
  }

  async update(id: any, updateVarietyDto: UpdateVarietyDto): Promise<Variety> {
    const product = await this.varietyRepository.update(id, updateVarietyDto);
    if(!product){
      throw new NotFoundException(`Product with ID ${id} not found`)
     }
    return this.findOne(id);
  }
  

  async remove(id:any):Promise<{message:string}>{
    const variety = await this.varietyRepository.delete(id)
    if(variety.affected===0){
      throw new NotFoundException(`Variety with ID ${id} not found`)
    }
    return {message:`Deleted succesfully`}
  }
}  
