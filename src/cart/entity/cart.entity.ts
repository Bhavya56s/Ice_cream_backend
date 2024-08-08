import { Profiles } from "src/profile/entities/profile.entity";
import { Variety } from "src/variety/entity/variety.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profiles, user => user.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Profiles;

  @ManyToOne(() => Variety, variety => variety.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'varietyId' })
  variety: Variety;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalprice: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
