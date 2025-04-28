import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from './user-data-builder'
describe('UserEntity Unit Test', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = UserDataBuilder(props)
    sut = new UserEntity(props)
  })

  it('Constructor Method', () => {
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.name).toEqual(props.name)
    expect(typeof sut.name).toBe('string')
  })

  it('Setter of name field', () => {
    expect(sut.props.name).toBeDefined()
    sut['name'] = 'new name'
    expect(sut.name).toEqual('new name')
    expect(typeof sut.name).toBe('string')
  })

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.email).toEqual(props.email)
    expect(typeof sut.email).toBe('string')
  })

  it('Setter of email field', () => {
    expect(sut.props.email).toBeDefined()
    sut['email'] = 'new email'
    expect(sut.email).toEqual('new email')
    expect(typeof sut.email).toBe('string')
  })

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.password).toEqual(props.password)
    expect(typeof sut.password).toBe('string')
  })

  it('Setter of password field', () => {
    expect(sut.props.password).toBeDefined()
    sut['password'] = 'new password'
    expect(sut.password).toEqual('new password')
    expect(typeof sut.password).toBe('string')
  })

  it('Getter of createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.createdAt).toEqual(props.createdAt)
    expect(sut.createdAt).toBeInstanceOf(Date)
  })

  it('Should update a user', () => {
    sut.updateName('new updated name')
    expect(sut.name).toEqual('new updated name')
  })

  it('Should update a password', () => {
    sut.updatePassword('updated password')
    expect(sut.password).toEqual('updated password')
  })
})
