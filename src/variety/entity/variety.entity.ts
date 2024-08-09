import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../product/entity/product.entity";
import { Purchase } from "src/purchase/entities/purchase.entity";
import { Favourite } from "src/favourites/entity/favourite.entity";
import { Cart } from "src/cart/entity/cart.entity";
import { Review } from "src/review/entity/review.entity";

@Entity()
export class Variety {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  availabale: number; 

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Product, product => product.varieties, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => Purchase, purchase => purchase.variety, { onDelete: 'CASCADE', cascade: true })
  purchases: Purchase[];

  @OneToMany(() => Favourite, favourite => favourite.variety, { onDelete: 'CASCADE', cascade: true })
  favourites: Favourite[];

  @OneToMany(() => Cart, cart => cart.variety, { onDelete: 'CASCADE', cascade: true })
  carts: Cart[];

  @OneToMany(() => Review, review => review.variety, { onDelete: 'CASCADE', cascade: true })
  reviews: Review[];
}
