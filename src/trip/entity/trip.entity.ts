import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { IsOptional } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'trip' })
@ObjectType()
export class Trip {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string
    @Column()
    @Field(() => String)
    name: string
    @Column()
    @Field(() => String)
    description: string
    @Column()
    @Field(() => String)
    date: string
    @Column()
    @Field(() => Boolean)
    @IsOptional()
    active?: boolean = true



}