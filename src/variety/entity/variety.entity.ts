import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../product/entity/product.entity";
import { Purchase } from "src/purchase/entities/purchase.entity";

@Entity({name :'Varities'})

export class Variety {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @Column()
  description:string;

  @Column()
  price:number;

  @Column()
  availabale:number;

  @CreateDateColumn({type:'timestamp'})
  created_at:Date;

  @UpdateDateColumn({type:'timestamp'})
  updated_at:Date;
  
  @ManyToOne(() => Product, product => product.varieties,{eager:true})
  @JoinColumn({ name: 'product_id' }) 
  product: Product;

  @OneToMany(() => Purchase, purchase => purchase.variety)
  purchases: Purchase[];

}