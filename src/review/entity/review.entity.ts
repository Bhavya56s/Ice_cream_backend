import { IsInt, Max, Min } from "class-validator";
import { Profiles } from "src/profile/entities/profile.entity";
import { Variety } from "src/variety/entity/variety.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()

export class Review{
  @PrimaryGeneratedColumn()
  id:number


  @IsInt()
  @Column('decimal',{ precision: 10, scale: 2 })
  @Min(0.1)
  @Max(5)
  rating:number

  @ManyToOne(() => Profiles, user => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Profiles;

  @ManyToOne(() => Variety, variety => variety.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'varietyId' })
  variety: Variety;

  
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
