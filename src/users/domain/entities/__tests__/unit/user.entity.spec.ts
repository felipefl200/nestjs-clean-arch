import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '../../testing/helpers/user-data-builder'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity
  beforeEach(() => {
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })

  it('Constructor Method', () => {
    expect(sut).toBeInstanceOf(UserEntity)
    expect(sut.id).toBe(props.id)
    expect(sut.name).toBe(props.name)
    expect(sut.email).toBe(props.email)
    expect(sut.password).toBe(props.password)
    expect(sut.createdAt).toBeInstanceOf(Date)
    expect(sut.updatedAt).toBeInstanceOf(Date)
  })

  it('Getter and Setter Methods of Name', () => {
    expect(sut.name).toBeDefined()
    expect(typeof sut.name).toBe('string')
    expect(sut.name).toEqual(props.name)
  })

  it('Getter and Setter Methods of Email', () => {
    expect(sut.email).toBeDefined()
    expect(typeof sut.email).toBe('string')
    expect(sut.email).toEqual(props.email)
  })

  it('Getter and Setter Methods of Password', () => {
    expect(sut.password).toBeDefined()
    expect(typeof sut.password).toBe('string')
    expect(sut.password).toEqual(props.password)
  })

  it('Getter and Setter Methods of CreatedAt', () => {
    expect(sut.createdAt).toBeDefined()
    expect(sut.createdAt).toBe(props.createdAt)
  })

  it('Getter and Setter Methods of UpdatedAt', () => {
    expect(sut.updatedAt).toBeDefined()
    expect(sut.updatedAt).toBe(props.updatedAt)
  })
})
