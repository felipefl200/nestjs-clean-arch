import { Entity } from '../entity'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}
const uuidValidateRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

describe('Entity unit tests', () => {
  it('should be set prop1 and id', () => {
    const entity = new StubEntity({ prop1: 'John Doe', prop2: 123 })

    expect(entity.props.prop1).toBe('John Doe')
    expect(entity.props.prop2).toBe(123)
    expect(entity.id).toBeDefined()
    expect(entity.id).toMatch(uuidValidateRegex)
  })

  it('should be accept a valid uuid', () => {
    const id = 'c4a2ae39-a248-41bb-b98d-8dca08b581fa'
    const entity = new StubEntity({ prop1: 'John Doe', prop2: 123 }, id)

    expect(entity.id).toBe(id)
    expect(entity.id).toMatch(uuidValidateRegex)
  })

  it('should be convert a entity to json', () => {
    const entity = new StubEntity({ prop1: 'John Doe', prop2: 123 })

    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      prop1: 'John Doe',
      prop2: 123,
    })
  })
})
