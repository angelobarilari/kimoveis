import { Entity, 
         Column, 
         PrimaryGeneratedColumn,
         OneToOne,
         JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Propertie } from "./properties.entity";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column( { length: 100 } )
  district: string;

  @Column( { length: 9 } )
  zipCode: string;

  @Column( { nullable: true } )
  number?: string;

  @Column()
  city: string;

  @Column()
  state: string;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Address } 
