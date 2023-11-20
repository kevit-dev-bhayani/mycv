import {
  Entity,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  admin: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('inserted user with id ', this.id);
  }

  @AfterRemove()
  logRemoved() {
    console.log('user removed');
  }

  @AfterUpdate()
  logUpdate() {
    console.log('updated user with id ', this.id);
  }
}
