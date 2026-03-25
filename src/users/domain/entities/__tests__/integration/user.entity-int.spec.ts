import { EntityValidationError } from '@/shared/domain/entities/errors/validation-error'
import { UserDataBuilder } from '../../testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'

describe('UserEntity Integration Tests', () => {
  describe('Constructor Method', () => {
    it('should throw an error when an invalid name is provided', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 123123123 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })
  })

  it('should throw an error when an invalid email is provided', () => {
    let props: UserProps = {
      ...UserDataBuilder({}),
      email: null as any,
    }
    expect(() => new UserEntity(props)).toThrow(EntityValidationError)

    props = {
      ...UserDataBuilder({}),
      email: '',
    }
    expect(() => new UserEntity(props)).toThrow(EntityValidationError)

    props = {
      ...UserDataBuilder({}),
      email: 'a'.repeat(11),
    }
    expect(() => new UserEntity(props)).toThrow(EntityValidationError)
  })

  it('should throw an error when an invalid password is provided', () => {
    let props: UserProps = {
      ...UserDataBuilder({}),
      password: null as any,
    }
    expect(() => new UserEntity(props)).toThrow(EntityValidationError)

    props = {
      ...UserDataBuilder({}),
      password: '',
    }
    expect(() => new UserEntity(props)).toThrow(EntityValidationError)

    props = {
      ...UserDataBuilder({}),
      password: 'a'.repeat(101),
    }
    expect(() => new UserEntity(props)).toThrow(EntityValidationError)
  })

  it('should throw an error when an invalid createdAt is provided', () => {
    let props: UserProps = {
      ...UserDataBuilder({}),
      createdAt: 2026 as any,
    }
    expect(() => new UserEntity(props)).toThrow(EntityValidationError)
  })

  it('should throw an error when an invalid updatedAt is provided', () => {
    let props: UserProps = {
      ...UserDataBuilder({}),
      updatedAt: 2026 as any,
    }
    expect(() => new UserEntity(props)).toThrow(EntityValidationError)
  })

  it('should create a valid user', () => {
    const props = UserDataBuilder({})
    const user = new UserEntity(props)
    expect(user.props).toEqual(props)
    expect.assertions(1)
  })

  describe('Update Method', () => {
    it('should update a valid user', () => {
      const props = UserDataBuilder({})
      const user = new UserEntity(props)
      user.update({ name: 'new name' })
      expect(user.props.name).toBe('new name')

      user.update({ password: 'new password' })
      expect(user.props.password).toBe('new password')

      user.update({ email: 'new.email@test.com' })
      expect(user.props.email).toBe('new.email@test.com')

      expect(user.props.updatedAt).toBeInstanceOf(Date)
      expect.assertions(4)
    })

    it('should throw an error when an invalid name is provided', () => {
      const props = UserDataBuilder({})
      const user = new UserEntity(props)
      expect(() => user.update({ name: 'a'.repeat(256) })).toThrow(
        EntityValidationError,
      )

      expect(() => user.update({ name: '' })).toThrow(EntityValidationError)

      expect(() => user.update({ name: 123123123 as any })).toThrow(
        EntityValidationError,
      )
    })

    it('should throw an error when an invalid email is provided', () => {
      const props = UserDataBuilder({})
      const user = new UserEntity(props)
      expect(() => user.update({ email: 'a'.repeat(256) })).toThrow(
        EntityValidationError,
      )

      expect(() => user.update({ email: '' })).toThrow(EntityValidationError)

      expect(() => user.update({ email: 123123123 as any })).toThrow(
        EntityValidationError,
      )
    })

    it('should throw an error when an invalid password is provided', () => {
      const props = UserDataBuilder({})
      const user = new UserEntity(props)
      expect(() => user.update({ password: 'a'.repeat(256) })).toThrow(
        EntityValidationError,
      )

      expect(() => user.update({ password: '' })).toThrow(EntityValidationError)

      expect(() => user.update({ password: 12345 as any })).toThrow(
        EntityValidationError,
      ) // min 6 password length
    })

    it('should throw an error when an invalid createdAt is provided', () => {
      const props = UserDataBuilder({})
      const user = new UserEntity(props)
      expect(() => user.update({ createdAt: 2026 as any })).toThrow(
        EntityValidationError,
      )
    })

    it('should throw an error when an invalid updatedAt is provided', () => {
      const props = UserDataBuilder({})
      const user = new UserEntity(props)
      expect(() => user.update({ updatedAt: 2026 as any })).toThrow(
        EntityValidationError,
      )
    })
  })
})
