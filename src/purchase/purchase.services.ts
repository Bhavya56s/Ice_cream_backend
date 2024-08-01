import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { User } from 'src/users/entities/user.entity';
import { CreatePurchaseDto } from './dto/purchase.dto';
import { Variety } from 'src/variety/entity/variety.entity';
import { classToPlain } from 'class-transformer';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Variety)
    private varietyRepository: Repository<Variety>,
  ) {}

  async createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<any> {
    const { userId, varietyId, quantity } = createPurchaseDto;

    const user = await this.userRepository.findOne({ where:{id:userId}});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const variety = await this.varietyRepository.findOne({where:{id:varietyId}});
    if (!variety) {
      throw new NotFoundException('Variety not found');
    }

    if (variety.availabale < quantity) {
      throw new BadRequestException('Insufficient variety quantity available');
    }

    const totalBill = variety.price * quantity;

    variety.availabale -= quantity;
    await this.varietyRepository.save(variety);

    user.totalAmountSpent += totalBill;
    await this.userRepository.save(user);

    
    const purchase = this.purchaseRepository.create({
      variety,user,quantity,totalBill
    });


    await this.purchaseRepository.save(purchase);

    return classToPlain(purchase);
  }

  async getAllPurchasesByUser(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({where:{id:userId},});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const purchases = await this.purchaseRepository.find({
      where: { user : {id:userId} },
      relations: ['variety'],
    });

    return classToPlain(purchases);
  }
}
