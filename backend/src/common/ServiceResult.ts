import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"

/**
 * Service result class
 */
export class ServiceResult<T>{
  @ApiProperty()
  status: boolean = false

  @ApiProperty()
  message?: string | string[]

  @ApiProperty()
  code: HttpStatus

  @ApiProperty()
  data?: T
}