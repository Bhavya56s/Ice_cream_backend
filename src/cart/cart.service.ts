import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./entity/cart.entity";
import { Repository } from "typeorm";
import { Variety } from "src/variety/entity/variety.entity";
import { Profiles } from "src/profile/entities/profile.entity";
import { CreateCartDto, UpdateCartDto } from "./dto/cart.dto";
import { classToPlain } from "class-transformer";

@Injectable()

export class CartServices{
  constructor(@InjectRepository(Cart)
private cartRepository:Repository<Cart>,
@InjectRepository(Variety)
private varietyRepository:Repository<Variety>,
@InjectRepository(Profiles)
private profileRepository:Repository<Profiles>){}

async createCart(id:number,createCartDto:CreateCartDto):Promise<any>{

  const{varietyId,quantity,} = createCartDto

    const user = await this.profileRepository.findOne({where:{id}});

    if(!user){
      throw new NotFoundException(`User doesnot exist`)
    }

    if(user.role !== 'user'){
      throw new NotFoundException(`You dont have permissions to add items`)
    }

    const variety = await this.varietyRepository.findOne({where:{id:varietyId}});

    if (!variety) {
      throw new NotFoundException('Variety not found');
    }

    if (variety.availabale < quantity) {
      throw new NotFoundException('Insufficient variety quantity available');
    }

    const totalBill = variety.price * quantity;

    const cart =  this.cartRepository.create({
      
      totalprice:totalBill,
      variety,
      quantity,
      price:variety.price,
      user
    })

    await this.cartRepository.save(cart)

    return `Added to Cart`
}

async getCart(id:number){
  const cart = await this.cartRepository.find({where:{user:{id}}});

  if (!cart) {
    throw new NotFoundException('Profile not found.');
  }

  return classToPlain(cart);
}



async updateCart(userId: number, id: number, updateCartDto: UpdateCartDto): Promise<string> {
  const { quantity } = updateCartDto;

  
  const cart = await this.cartRepository.findOne({ where: { id }, relations: ['variety'] });

  if (!cart) {
    throw new NotFoundException('Cart not found.');
  }


  if (cart.user.id !== userId) {
    throw new NotFoundException('You are not authorized to update this cart.');
  }

  
  const variety = await this.varietyRepository.findOne({ where: { id: cart.variety.id } });

  if (!variety) {
    throw new NotFoundException('Variety not found.');
  }

 
  if (variety.availabale < quantity) {
    throw new NotFoundException('Insufficient variety quantity available.');
  }

  
  const totalPrice = variety.price * quantity;


  cart.quantity = quantity;
  cart.totalprice = totalPrice;

  await this.cartRepository.save(cart);

  return 'Update successful';
}

async deleteCart(userId:number,id:number){
  const cart = await this.cartRepository.findOne({ where: { id }, relations: ['variety'] });

  if (!cart) {
    throw new NotFoundException('Cart not found.');
  }



  const deleted = await this.cartRepository.delete(id)

  return ('Sucesfully deleted')

}
}



