// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class Wallet extends BaseEntity {

  @PrimaryColumn({length: 100})
  id: string;

  @Column({nullable: false})
  balance: number;

  @OneToMany (() => Transaction, transactions => transactions.wallet)
  transactions: Transaction[];
}
