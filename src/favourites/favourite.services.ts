import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Variety } from "src/variety/entity/variety.entity";
import { Repository } from "typeorm";
import { Favourite } from "./entity/favourite.entity";
import { CreateFavouriteDto } from "./dto/favourite.dto";
import { classToPlain } from "class-transformer";
import { Profiles } from "src/profile/entities/profile.entity";

@Injectable()
export class FavouriteService{
  constructor( @InjectRepository(Favourite)
  private favouriteRepository: Repository<Favourite>,
  @InjectRepository(Profiles)
  private profileRepository: Repository<Profiles>,
  @InjectRepository(Variety)
  private varietyRepository: Repository<Variety>){}

  async createFavourite(createFavouriteDto:CreateFavouriteDto):Promise<{message:string}>{
    const { userId, varietyId } = createFavouriteDto;

    const user = await this.profileRepository.findOne({ where:{id:userId}});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const variety = await this.varietyRepository.findOne({where:{id:varietyId}});
    if (!variety) {
      throw new NotFoundException('Variety not found');
    }

    const favourite =  this.favouriteRepository.create({variety,user})

    await this.favouriteRepository.save(favourite);

    return ({message :`Added to favourites`});
  }

  async getallfavouritebyUser(userId: number): Promise<any> {
    const user = await this.profileRepository.findOne({where:{id:userId},});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const favourites = await this.favouriteRepository.find({
      where: { user : {id:userId} },
      relations: ['variety'],
    });

    return classToPlain(favourites);
  }

  async remove(id: any): Promise<{message:string}> {
    const favorite = await this.favouriteRepository.delete(id);
   
    if(favorite.affected===0){
     throw new NotFoundException(`Product with ID ${id} not found`)
    }
   
     return {message:`Succesfully delete`}
   }

}