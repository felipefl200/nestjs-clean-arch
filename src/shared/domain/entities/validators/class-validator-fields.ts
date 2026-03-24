import { validateSync, type ValidationError } from 'class-validator'
import {
  type FieldsErrors,
  type ValidatorFieldsInterface,
} from './validator-fields.interface'

export abstract class ClassValidatorFields<
  PropsValidated extends object,
> implements ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors | null = null
  validatedData: PropsValidated | null = null

  validate(data: PropsValidated): boolean {
    const errors: ValidationError[] = validateSync(data)

    if (errors.length > 0) {
      this.errors = {}

      for (const error of errors) {
        const field = error.property

        if (error.constraints) {
          this.errors[field] = Object.values(error.constraints)
        }
      }

      return false
    }

    this.validatedData = data
    this.errors = null
    return true
  }
}
