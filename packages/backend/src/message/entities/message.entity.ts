import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm'

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column()
  sender: string

  @Column()
  receiver: string
}
