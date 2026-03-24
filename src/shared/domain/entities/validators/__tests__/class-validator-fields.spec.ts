import { ClassValidatorFields } from '../class-validator-fields'
import * as libClassValidator from 'class-validator'

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string
}> {}

describe('ClassValidatorFields Unit Tests', () => {
  const sut = new StubClassValidatorFields()
  it('should initilize with errors and validatedData as null', () => {
    expect(sut.errors).toEqual({})
    expect(sut.validatedData).toBeNull()
  })

  it('should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      {
        property: 'field',
        constraints: { required: 'Field is required' },
      } as any,
    ])
    const sut = new StubClassValidatorFields()

    expect(sut.validate({ field: 'invalid' })).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.errors).toEqual({ field: ['Field is required'] })
    expect(sut.validatedData).toBeNull()
  })

  it('should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])
    const sut = new StubClassValidatorFields()

    expect(sut.validate({ field: 'valid' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.errors).toEqual({})
    expect(sut.validatedData).toEqual({ field: 'valid' })
  })
})
