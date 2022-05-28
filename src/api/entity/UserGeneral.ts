import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from ".";
import { Gender } from "../../utils/constant";

@Entity("user_general")
export default class UserGeneral {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: null,
  })
  gender: Gender;

  @Column()
  dob: string;

  @Column()
  affiliation: string;

  @Column()
  address: string;

  @Column()
  rest_address: string;

  @Column()
  interests: string;

  @Column({
    default: false,
  })
  markating_info: string;

  @ManyToOne(() => User, (user) => user.userGeneral, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}
