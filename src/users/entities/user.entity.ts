import { IsEmail, MinLength } from "class-validator";
import { Purchase } from "src/purchase/entities/purchase.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}


@Entity({name:'Users'})

export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({nullable:false})
  name:string;

  @Column({unique:true,nullable:false})
  @IsEmail()
  email:string;

  @Column({nullable:false})
  @MinLength(6)
  password:string;

 

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  role: Role;

  @CreateDateColumn({type:'timestamp'})
  created_at:Date;

  @UpdateDateColumn({type:'timestamp'})
  updated_at:Date;
  

  @OneToMany(() => Purchase, purchase => purchase.user)
  purchases: Purchase[];
}