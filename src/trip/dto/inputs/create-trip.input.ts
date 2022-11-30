import { Field, InputType } from "@nestjs/graphql"
import { IsString, IsNotEmpty } from "class-validator"

@InputType()
export class CreateTripInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    name: string
    
    @Field(() => String)
    @IsString()
    description: string
    
    @Field(() => String)
    @IsString()
    date: string
}