import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar" })
  name: string;

  @Column({ name: "email", type: "varchar" })
  email: string;

  constructor(aggregate: any) {
    if (aggregate) {
      this.email = aggregate.email;
      this.name = aggregate.name;
    }
  }
}
