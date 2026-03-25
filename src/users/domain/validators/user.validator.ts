import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { UserProps } from '../entities/user.entity'
import { ClassValidatorFields } from '@/shared/domain/entities/validators/class-validator-fields'

class UserRules {
  @MaxLength(255, {
    message: 'name must be shorter than or equal to 255 characters',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @MaxLength(100, {
    message: 'password must be shorter than or equal to 100 characters',
  })
  @MinLength(6, {
    message: 'password must be longer than or equal to 6 characters',
  })
  @IsNotEmpty()
  password: string

  @IsDate()
  @IsNotEmpty()
  createdAt: Date

  @IsDate()
  updatedAt: Date

  constructor({ name, email, password, createdAt, updatedAt }: UserProps) {
    Object.assign(this, { name, email, password, createdAt, updatedAt })
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(props: UserProps): boolean {
    return super.validate(new UserRules(props ?? {}))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}
