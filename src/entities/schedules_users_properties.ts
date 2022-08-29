import { Entity, 
         Column, 
         CreateDateColumn, 
         PrimaryGeneratedColumn, 
         ManyToOne} from "typeorm";
import { v4 as uuid } from "uuid";
import { Propertie } from "./properties.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
class SchedulesUserProperties {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column( {  type: 'date'  } )
  date: string;
 
  @Column( {  type: 'time'  } )
  hour: string;

  @ManyToOne(() => Propertie, { eager: true, nullable: false } )
  property: Propertie

  @ManyToOne(() => User, { eager: true, nullable: false } )
  user: User

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { SchedulesUserProperties } 
