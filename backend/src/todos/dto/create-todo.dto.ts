import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNumber, IsString } from "class-validator"
export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsDateString()
  dueDate: string

  @ApiProperty()
  @IsNumber()
  executorId: number
}
