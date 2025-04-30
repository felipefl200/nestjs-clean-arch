import * as classValidator from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

class StubValidatorFields extends ClassValidatorFields<{ field: string }> {}

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize errors and validatedData with null', () => {
    const validator = new StubValidatorFields()
    expect(validator.errors).toBeNull()
    expect(validator.validatedData).toBeNull()
  })

  it('Should validate with errors', () => {
    const spyValidateSync = jest.spyOn(classValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      {
        property: 'field',
        constraints: {
          isRequired: 'field must be a string',
        },
      },
    ])
    const sut = new StubValidatorFields()
    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeNull()
    expect(sut.errors).toEqual({
      field: ['field must be a string'],
    })
  })

  it('Should validate without errors', () => {
    const spyValidateSync = jest.spyOn(classValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])
    const sut = new StubValidatorFields()

    expect(sut.validate({ field: 'any_value' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toStrictEqual({ field: 'any_value' })
    expect(sut.errors).toBeNull()
  })
})
