import { User } from "src/users/entities/user.entity";
import { Variety } from "src/variety/entity/variety.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()

export class Favourite{
  @PrimaryGeneratedColumn()
  id:number

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