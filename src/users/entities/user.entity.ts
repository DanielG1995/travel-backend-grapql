import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string
  @Column()
  @Field(() => String)
  fullName: string
  @Column({ unique: true })
  @Field(() => String)
  email: string
  @Column()
  password: string
  @Field(() => [String])
  @Column({
    type: 'text',
    array:true,
    default: ['user']
  })
  roles: string[]
  @Column({
    type: 'boolean',
    default: true
  })
  @Field(() => Boolean)
  isActive: boolean
}
