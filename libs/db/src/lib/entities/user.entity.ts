import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 32 })
  @Index({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  profilePictureUrl?: string;

  @Column({ length: 150, nullable: true })
  bio?: string;

  @Column()
  password: string;

  @Column()
  resetPasswordCode: string;

  @Column({ type: 'smallint', default: 0 })
  resetPasswordAttempts = 0;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}