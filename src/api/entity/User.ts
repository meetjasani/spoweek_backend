import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { LoginWith, RoleType, UserType } from "../../utils/constant";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true, default: null })
  avatar: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column({
    default: false,
  })
  is_verified: boolean;

  @Column({
    default: false,
  })
  is_deleted: boolean;

  @Column({
    type: "timestamp",
    default: null,
  })
  deleted_at: Date;

  @Column({
    type: "enum",
    enum: RoleType,
    default: null,
  })
  deleted_by: RoleType;

  @CreateDateColumn({
    type: "timestamp",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updated_at: Date;

  @Column({
    type: "enum",
    enum: LoginWith,
    default: LoginWith.manual,
  })
  login_with: LoginWith;

  @Column({
    default: false,
  })
  is_admin: boolean;

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.general,
  })
  user_type: UserType;

  @OneToMany(() => User, (general) => general.userGeneral)
  userGeneral: User;

  @OneToMany(() => User, (business) => business.userBusiness)
  userBusiness: User;

}
