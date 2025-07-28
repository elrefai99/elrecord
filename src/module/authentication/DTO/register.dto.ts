import { IsString } from 'class-validator';

export class registerDto {

     @IsString()
     public fullname: string;

     @IsString()
     public email: string;

     @IsString()
     public password: string;

     @IsString()
     public code: string;

     @IsString()
     public phone: string;
}
