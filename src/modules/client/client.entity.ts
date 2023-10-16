import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { Person } from '../person/person.entity';
import { User } from '../user/user.entity';
import { City } from '../city/city.entity';
import { Country } from '../country/country.entity';

import { ClientType } from '../client_type/client_type.entity';

@Index(['public_id', 'account_id'], { unique: true })
@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  //referencia a person
  @Column({ name: 'person_id' })
  person_id: number;

  @ManyToOne(() => Person, (person) => [person.id])
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: Person;

  @Column({ nullable: true })
  dependents: string;

  @Column({ nullable: true })
  personal_number: string;

  @Column({ nullable: true })
  email: string;

  @ManyToOne(() => City, (city) => city.id)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @ManyToOne(() => Country, (country) => country.id)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @ManyToOne(() => ClientType, (client_type) => client_type.id)
  @JoinColumn({ name: 'client_type_id' })
  client_type: ClientType;

  @Column({ nullable: true })
  value_1: string;

  @Column({ nullable: true })
  value_2: string;

  @Column({ nullable: true })
  value_3: string;

  @Column({ nullable: true })
  value_4: string;

  @Column({ nullable: true })
  value_5: string;

  //referencia al account_id
  @Column({ name: 'account_id' })
  account_id: number;

  @ManyToOne(() => Account, (account) => account.branches)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
  account: Account;

  //public id unique by account_id
  @Column({ name: 'public_id' })
  public_id: number;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date

  //referencia de usuario
  @Column({ nullable: true, name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
