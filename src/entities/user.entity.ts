import { Entity, 
         Column, 
         CreateDateColumn, 
         UpdateDateColumn, 
         PrimaryGeneratedColumn,
         OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { SchedulesUserProperties } from "./schedules_users_properties";
import { Exclude } from 'class-transformer'

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column(  { length: 150 } )
  name: string;

  @Column(  { length: 150, unique: true } )
  email: string;

  @Column()
  isAdm: boolean;

  @Column(  { default: true } )
  isActive: boolean

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SchedulesUserProperties, SchedulesUserProperties => SchedulesUserProperties.user)
  schedule: SchedulesUserProperties[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { User } 
