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
})
