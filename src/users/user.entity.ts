import {
  Entity,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
