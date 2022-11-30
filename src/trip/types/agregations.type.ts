import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsInt } from "class-validator";

@ObjectType()
export class AgregationTypes {
    @Field(() => Int)
    @IsInt()
    total: number

    @Field(() => Int)
    @IsInt()
    active: number

    @Field(() => Int)
    @IsInt()
    inactive: number
}