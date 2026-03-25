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
        name: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })
  })
})
