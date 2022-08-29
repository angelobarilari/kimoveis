import { Entity, 
         Column, 
         CreateDateColumn, 
         UpdateDateColumn, 
         PrimaryGeneratedColumn, 
         OneToMany,
         OneToOne,
         JoinColumn,
         ManyToOne} from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";
import { SchedulesUserProperties } from "./schedules_users_properties";

@Entity("properties")
class Propertie {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column( { default: false } )
  sold: boolean;

  @Column( { type: "decimal", precision: 10, scale: 2, default: 0 } )
  value: number;

  @Column( { type: "integer" } )
  size: number

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SchedulesUserProperties, SchedulesUserProperties => SchedulesUserProperties.property)
  schedules: SchedulesUserProperties[]
  
  @OneToOne(() => Address, { eager: true, onDelete: "CASCADE" } ) @JoinColumn()
  address: Address

  @ManyToOne(() => Category, { eager: true, nullable: true } )
  category: Category
  
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Propertie } 
