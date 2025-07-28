import { IsString } from 'class-validator';

export class loginDto {
     @IsString()
     public email: string;

     @IsString()
     public password: string;
}
