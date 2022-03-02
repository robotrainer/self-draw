import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

class UpdateDrawingDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsBoolean()
  @IsOptional()
  publication: boolean;
}

export default UpdateDrawingDto;
