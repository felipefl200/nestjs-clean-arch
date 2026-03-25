import { UserDataBuilder } from '../entities/testing/helpers/user-data-builder'
import { UserValidator, UserValidatorFactory } from './user.validator'

let sut: UserValidator
describe('User Validator Unit Tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })
  describe('Name field', () => {
    it('Invalidation cases for name field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('name')

      isValid = sut.validate({ name: '' } as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('name')

      isValid = sut.validate({ name: 'a'.repeat(256) } as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('name')
    })

    it('valid case for name field', () => {
      const validUser = UserDataBuilder({})
      const isValid = sut.validate({ ...validUser, name: 'João Silva' })
      expect(isValid).toBe(true)
    })
  })

  describe('Email field', () => {
    it('Invalidation cases for email field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('email')

      isValid = sut.validate({ email: '' } as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('email')

      isValid = sut.validate({ email: 'a'.repeat(100) } as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('email')
    })

    it('valid case for email field', () => {
      const validUser = UserDataBuilder({})
      const isValid = sut.validate({ ...validUser, email: 'email@email.com' })
      expect(isValid).toBe(true)
    })
  })

  describe('Password field', () => {
    it('Invalidation cases for password field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('password')

      isValid = sut.validate({ password: '' } as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('password')

      isValid = sut.validate({ password: 'a'.repeat(5) } as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('password')
      expect(sut.errors?.password).toEqual([
        'password must be longer than or equal to 6 characters',
      ])

      isValid = sut.validate({ password: 'a'.repeat(101) } as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('password')
      expect(sut.errors?.password).toEqual([
        'password must be shorter than or equal to 100 characters',
      ])
    })

    it('valid case for password field', () => {
      const validUser = UserDataBuilder({})
      const isValid = sut.validate({ ...validUser, password: 'password' })
      expect(isValid).toBe(true)
    })
  })

  describe('CreatedAt field', () => {
    it('Invalidation cases for createdAt field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('createdAt')

      isValid = sut.validate({ createdAt: '' } as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('createdAt')

      isValid = sut.validate({ createdAt: 'a'.repeat(100) } as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('createdAt')
    })

    it('valid case for createdAt field', () => {
      const validUser = UserDataBuilder({})
      const isValid = sut.validate({ ...validUser, createdAt: new Date() })
      expect(isValid).toBe(true)
    })
  })

  describe('UpdatedAt field', () => {
    it('Invalidation cases for updatedAt field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('updatedAt')

      isValid = sut.validate({ updatedAt: '' } as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('updatedAt')

      isValid = sut.validate({ updatedAt: 'a'.repeat(100) } as any)
      expect(isValid).toBe(false)
      expect(sut.errors).toHaveProperty('updatedAt')
    })

    it('valid case for updatedAt field', () => {
      const validUser = UserDataBuilder({})
      const isValid = sut.validate({ ...validUser, updatedAt: new Date() })
      expect(isValid).toBe(true)
    })
  })
})
