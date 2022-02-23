import {
  IsBase64,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class CreateDrawingDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @IsBase64()
  @IsNotEmpty()
  imgBase64: string;
}

export default CreateDrawingDto;
