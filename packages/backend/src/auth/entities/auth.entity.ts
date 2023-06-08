import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ select: false })
  password: string

  @Column({
    default: 'https://api.multiavatar.com/Starcrasher.png?apikey=HuynXr0VEYsQPv'
  })
  avatar: string

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createTime: Date

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateTime: Date
}
