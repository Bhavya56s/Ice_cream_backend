import { Product } from "src/product/entity/product.entity";
import { User } from "src/users/entities/user.entity";
import { Variety } from "src/variety/entity/variety.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'Purchase'})

export class Purchase{
  @PrimaryGeneratedColumn()
  id:number


  @CreateDateColumn({type:'timestamp'})
  created_at:Date;

  @UpdateDateColumn({type:'timestamp'})
  updated_at:Date;

  @ManyToOne(() => User, user => user.purchases)
  user: User;

  @ManyToOne(() => Product, product => product.varieties)
  product: Product;

  @ManyToOne(() => Variety, variety => variety.purchases)
  variety: Variety;
}
