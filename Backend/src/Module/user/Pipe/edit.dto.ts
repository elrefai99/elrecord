import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class change_username_dto {
     @IsString()
     @IsNotEmpty()
     @IsAlphanumeric()
     @MinLength(3)
     @MaxLength(20)
     public username: string
}
