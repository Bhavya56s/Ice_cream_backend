import { Product } from "src/product/entity/product.entity";
import { User } from "src/users/entities/user.entity";
import { Variety } from "src/variety/entity/variety.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'Purchase'})

export class Purchase{
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  totalBill:number;
  
  @Column()
  quantity:number;

  @CreateDateColumn({type:'timestamp'})
  created_at:Date;

  @UpdateDateColumn({type:'timestamp'})
  updated_at:Date;

  @ManyToOne(() => User, user => user.purchases,{eager:true})
  @JoinColumn({ name: 'userId' }) 
  user: User;

  
  @ManyToOne(() => Variety, variety => variety.purchases,{eager:true})
  @JoinColumn({ name: 'varietyId' }) 
  variety: Variety;
}
