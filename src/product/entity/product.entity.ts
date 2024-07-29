import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Variety } from "../../variety/entity/variety.entity";

@Entity({name:'Products'})

export class Product{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;
   
  @CreateDateColumn({type:'timestamp'})
  created_at:Date;

  @UpdateDateColumn({type:'timestamp'})
  updated_at:Date;

  @OneToMany(() => Variety, variety => variety.product)
  varieties: Variety[];
}