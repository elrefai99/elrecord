import { IsNotEmpty, IsString } from "class-validator";

export class register_dto {
     @IsString()
     @IsNotEmpty()
     public fullname: string

     @IsString()
     @IsNotEmpty()
     public email: string

     @IsString()
     @IsNotEmpty()
     public password: string


     @IsString()
     @IsNotEmpty()
     public phone: string

     @IsString()
     @IsNotEmpty()
     public country_code: string
}
