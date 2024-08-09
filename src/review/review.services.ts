import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./entity/review.entity";
import { Repository } from "typeorm";
import { Variety } from "src/variety/entity/variety.entity";
import { Profiles } from "src/profile/entities/profile.entity";
import { CreateReviewDto } from "./dto/review.dto";

@Injectable()
export class ReviewService{
  constructor(
    @InjectRepository(Review)
    private reviewRepository:Repository<Review>,
    @InjectRepository(Variety)
    private varietyRepository:Repository<Variety>,
    @InjectRepository(Profiles)
    private profileRepository:Repository<Profiles>
  ){}

  async createReview(createReviewDto:CreateReviewDto,id:number,userId:number):Promise<any>{

    const {rating} = createReviewDto

    const user = await this.profileRepository.findOne({where:{id:userId}})

    

    if(!user){
      throw new NotFoundException("User cannot be found")
    }

    const variety = await this.varietyRepository.findOne({where:{id}})
    


    if(!variety){
      throw new NotFoundException("Variety cannot be found")
    }

    const existingReview = await this.reviewRepository.findOne({
      where: {
        user: { id: userId },
        variety: { id }
      }
    });
  
    if (existingReview) {
      throw new ConflictException('Review already exists for this variety by the user');
    }

    
    const review = this.reviewRepository.create({
      variety,
      user,
      rating
    })
    

    if(!review){
      throw new BadRequestException('Review not added')
    }

    const saved = await this.reviewRepository.save(review)

  
    return `Review added sucesfully`
  }


  async getAllReview():Promise<any>{
    const findAll=  this.reviewRepository.find();
    if(!findAll){
      throw new NotFoundException('No data found')
    }
    return findAll
  }



  async getReview(userId:number):Promise<any>{
    const user = await this.profileRepository.findOne({where:{id:userId}})

    if(!user){
      throw new NotFoundException('User not found')
    }

    const review = await this.reviewRepository.findOne({where:{user}})

    if(!review){
      throw new NotFoundException('You dont have any review')
    }

    return review
  }


  async updateReview(userId:number,updateReviewDto:CreateReviewDto):Promise<any>{
    const user = await this.profileRepository.findOne({where:{id:userId}})

    if(!user){
      throw new NotFoundException('User not found')
    }

    const id = await this.reviewRepository.findOne({where:{user}})

    if(!id){
      throw new NotFoundException('You do not have any reviews')
    }
    
    const updated = await this.reviewRepository.update(id,updateReviewDto)

    if(!updated){
      throw new NotFoundException('Review Can not be updated')
    }
  }


  async deleteReview(userId:number,id:number):Promise<any>{
   
    const find = await this.reviewRepository.findOne({where:{id},relations:['user']})
    if(!find){
       throw new NotFoundException('Review doesnot exist')
    }

    if(find.user.id !== userId){
      throw new NotFoundException('You cannot delete this review')
    }
    
    const review = await this.reviewRepository.delete(id)
   
    return ('Review Deleted')

  }
}