import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from ".";

@Entity("user_business")
export default class UserBusiness {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true, default: null })
  company_name: string;

  @Column()
  department: string;

  @Column()
  position: string;

  @Column()
  bank_name: string;

  @Column()
  acount_holder: string;

  @Column()
  interests: string;

  @Column({
    default: false,
  })
  markating_info: boolean;

  @ManyToOne(() => User, (user) => user.userBusiness, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

}
