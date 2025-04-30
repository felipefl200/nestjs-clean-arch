import { UserDataBuilder } from '../../__tests__/unit/user-data-builder'
import { UserProps } from '../../user.entity'
import {
  UserRoles,
  UserValidator,
  UserValidatorFactory,
} from '../user.validator'

let sut: UserValidator
let props: UserProps

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
    props = UserDataBuilder()
  })

  describe('Valid User Fields', () => {
    it('Validation case for User fields', () => {
      const isValid = sut.validate(props)
      expect(isValid).toBeTruthy()
      expect(sut.validatedData).toStrictEqual(new UserRoles(props))
    })
  })

  describe('Name field', () => {
    it('Invalidation cases for name field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('name')
      expect(sut.errors!['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({ ...props, name: '' })
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('name')
      expect(sut.errors!['name']).toStrictEqual(['name should not be empty'])

      isValid = sut.validate({ ...props, name: 1 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('name')
      expect(sut.errors!['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({ ...props, name: 'a'.repeat(256) })
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('name')
      expect(sut.errors!['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('Email field', () => {
    it('Invalidation cases for Email field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('email')

      expect(sut.errors!['email']).toStrictEqual([
        'email should not be empty',
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({ ...props, email: '' })
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('email')
      expect(sut.errors!['email']).toStrictEqual([
        'email should not be empty',
        'email must be an email',
      ])

      isValid = sut.validate({
        ...props,
        email: 'test.test.net' as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('email')
      expect(sut.errors!['email']).toStrictEqual(['email must be an email'])

      isValid = sut.validate({ ...props, email: 'a'.repeat(256) })
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('email')
      expect(sut.errors!['email']).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('Password field', () => {
    it('Invalidation cases for password field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('password')

      expect(sut.errors!['password']).toStrictEqual([
        'password should not be empty',
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])

      isValid = sut.validate({ ...props, password: '' })
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('password')
      expect(sut.errors!['password']).toStrictEqual([
        'password should not be empty',
      ])

      isValid = sut.validate({
        ...props,
        password: 'a'.repeat(102),
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('password')
      expect(sut.errors!['password']).toStrictEqual([
        'password must be shorter than or equal to 100 characters',
      ])
    })
  })

  describe('CreatedAt field', () => {
    it('Invalidation cases for createdAt field', () => {
      let isValid = sut.validate({ ...props, createdAt: 1233 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('createdAt')
      expect(sut.errors!['createdAt']).toStrictEqual([
        'createdAt must be a Date instance',
      ])

      isValid = sut.validate({ ...props, createdAt: '30/04/2025' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors).toHaveProperty('createdAt')
      expect(sut.errors!['createdAt']).toStrictEqual([
        'createdAt must be a Date instance',
      ])
    })
  })
})
