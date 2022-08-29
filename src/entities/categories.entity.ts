import { Column, 
         Entity, 
         OneToMany, 
         PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Propertie } from "./properties.entity";

@Entity("categories")
class Category {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column( { length: 150, unique: true } )
    name: string

    @OneToMany(() => Propertie, Propertie => Propertie.category)
    properties: Propertie

    constructor() {
    if (!this.id) {
        this.id = uuid()
        }
    }
}

export { Category } 
