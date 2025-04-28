import { randomUUID } from 'node:crypto'
import { Entity } from '../../entity'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Entity Unit Tests', () => {
  it('Should set props and id', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity._id).not.toBeNull()
    expect(entity._id).toHaveLength(36) // Verifica se o ID tem o formato de um UUID
  })

  it('Should accept a valid uuid', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const id = randomUUID()
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const entity = new StubEntity(props, id)

    expect(entity._id).toBe(id)
    expect(entity._id).toHaveLength(36) // Verifica se o ID tem o formato de um UUID
    expect(entity._id).toMatch(uuidRegex)
  })

  it('Should convert an entity to a JavaScript Object', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const id = randomUUID()
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})
