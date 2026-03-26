import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '../../testing/helpers/user-data-builder'

describe('UserEntity unit tests', () => {
  UserEntity.validate = vi.fn()
  let props: UserProps
  let sut: UserEntity
  beforeEach(() => {
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })

  it('Constructor Method', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut).toBeInstanceOf(UserEntity)
    expect(sut.id).toBeDefined()
    expect(sut.name).toBe(props.name)
    expect(sut.email).toBe(props.email)
    expect(sut.password).toBe(props.password)
    expect(sut.createdAt).toBeInstanceOf(Date)
    expect(sut.updatedAt).toBeInstanceOf(Date)
  })

  it('Getter Method of Name', () => {
    expect(sut.name).toBeDefined()
    expect(typeof sut.name).toBe('string')
    expect(sut.name).toEqual(props.name)
  })

  it('Setter Method of Name', () => {
    sut['name'] = 'John Doe'
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.name).toBe('John Doe')
  })

  it('Getter Method of Email', () => {
    expect(sut.email).toBeDefined()
    expect(typeof sut.email).toBe('string')
    expect(sut.email).toEqual(props.email)
  })

  it('Setter Method of Email', () => {
    sut['email'] = 'new@email.com'
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.email).toBe('new@email.com')
  })

  it('Getter Method of Password', () => {
    expect(sut.password).toBeDefined()
    expect(typeof sut.password).toBe('string')
    expect(sut.password).toEqual(props.password)
  })

  it('Setter Method of Password', () => {
    sut['password'] = 'abc123'
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.password).toBe('abc123')
  })

  it('Getter Method of CreatedAt', () => {
    expect(sut.createdAt).toBeDefined()
    expect(sut.createdAt).toBe(props.createdAt)
  })

  it('Getter Method of UpdatedAt', () => {
    expect(sut.updatedAt).toBeDefined()
    expect(sut.updatedAt).toBe(props.updatedAt)
  })

  it('should update user properties', () => {
    const newName = 'John Doe Updated'
    const newEmail = 'updated@email.com'
    const newPassword = 'updatedPassword'

    sut.update({
      name: newName,
      email: newEmail,
      password: newPassword,
    })
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.name).toBe(newName)
    expect(sut.email).toBe(newEmail)
    expect(sut.password).toBe(newPassword)
    expect(sut.updatedAt).toBeInstanceOf(Date)
  })
})
