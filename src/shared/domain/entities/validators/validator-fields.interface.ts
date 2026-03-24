export type FieldsErrors = Record<string, string[]>

export interface ValidatorFieldsInterface<PropsValidated extends object> {
  errors: FieldsErrors
  validatedData: PropsValidated | null
  validate(data: PropsValidated): boolean
}
