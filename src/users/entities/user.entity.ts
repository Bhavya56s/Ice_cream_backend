import { Exclude } from "class-transformer";
import { IsEmail, MinLength } from "class-validator";
import { Favourite } from "src/favourites/entity/favourite.entity";
import { Purchase } from "src/purchase/entities/purchase.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}


@Entity()

export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({nullable:false})
  name:string;

  @Column({unique:true,nullable:false})
  @IsEmail()
  email:string;

  @Column({nullable:false})
  @Exclude()
  @MinLength(6)
  password:string;

 

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  role: Role;

  @Column({ default: 0 })
  totalAmountSpent: number;
  
  @CreateDateColumn({type:'timestamp'})
  created_at:Date;

  @UpdateDateColumn({type:'timestamp'})
  updated_at:Date;
  

  @OneToMany(() => Purchase, purchase => purchase.user)
  purchases: Purchase[];

  @OneToMany(() => Favourite, favourite => favourite.user)
  favourites: Favourite[];
}