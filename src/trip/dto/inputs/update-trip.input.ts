import { Field, ID, InputType, Int } from "@nestjs/graphql"
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

@InputType()
export class UpdateTripInput {

    @Field(() => ID)
    @IsNumber()
    @IsNotEmpty()
    id: string

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    name?: string

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description?: string

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    date?: string
}