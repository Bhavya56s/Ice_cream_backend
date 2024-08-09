import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateReviewDto } from "./dto/review.dto";
import { ReviewService } from "./review.services";
import { UserGuard } from "src/auth/user.gaurd";

@Controller('Review')
@ApiSecurity('JWT-Auth')
@ApiTags('Review')
@UseGuards(AuthGuard('jwt'),UserGuard)

export class ReviewController{

  constructor(private reviewService:ReviewService){}


  @Post('/:id')
  createReview(@Body() createReviewDto:CreateReviewDto,@Param('id') id:number,@Req() req:any){

    const userId= req.user.id
    
    return this.reviewService.createReview(createReviewDto,id,userId);
  }


  @Get('/all')
  getAllReview(){

    return this.reviewService.getAllReview();
  }


  @Get()
  getReview(@Req() req:any){

    const userId = req.user.id

    return this.reviewService.getReview(userId);
  }


  @Put()
  updateReview(@Req() req:any,@Body() updateReviewDto:CreateReviewDto){
    const userId = req.user.id

    return this.reviewService.updateReview(userId,updateReviewDto)
  }


  @Delete(':id')
  
  deleteReview(@Param('id') id:number,@Req() req:any){
    const userId = req.user.id
    return this.reviewService.deleteReview(userId,id)
  }
}