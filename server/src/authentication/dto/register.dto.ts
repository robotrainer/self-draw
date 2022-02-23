import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export default RegisterDto;
