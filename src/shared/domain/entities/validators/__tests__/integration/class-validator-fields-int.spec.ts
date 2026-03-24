import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

class StubRules {
  @MaxLength(255, {
    message: 'name must be shorter than or equal to 255 characters',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @IsPositive({ message: 'price must be a positive number' })
  @IsNotEmpty()
  price: number
  constructor(name: string, price: number) {
    Object.assign(this, { name, price })
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate(data: StubRules): boolean {
    return super.validate(new StubRules(data.name, data.price))
  }
}

describe('ClassValidatorFields Integration Tests', () => {
  const validator = new StubClassValidatorFields()
  it('should validate with errors', () => {
    const errors = validator.validate({
      name: 'a'.repeat(256),
      price: -1,
    })
    expect(errors).toBeFalsy()
    expect(validator.errors).toEqual({
      name: ['name must be shorter than or equal to 255 characters'],
      price: ['price must be a positive number'],
    })
    expect(validator.validatedData).toBeNull()
  })

  it('should validate without errors', () => {
    const validator = new StubClassValidatorFields()
    expect(validator.validate({ name: 'a'.repeat(255), price: 1 })).toBeTruthy()
    expect(validator.errors).toBeNull()
    expect(validator.validatedData).toEqual(new StubRules('a'.repeat(255), 1))
  })
})
