import { IsBoolean, IsOptional } from 'class-validator';

class UpdateDrawingDto {
  @IsBoolean()
  @IsOptional()
  publication: boolean;
}

export default UpdateDrawingDto;
