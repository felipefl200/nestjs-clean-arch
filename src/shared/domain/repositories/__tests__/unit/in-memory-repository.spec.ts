import { Entity } from '@/shared/domain/entities/entity'
import { InMemoryRepository } from '../../in-memory-repository'
import { NotFoundError } from '@/shared/domain/entities/errors/not-found-error'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {
  get items(): StubEntity[] {
    return this.entities
  }
}

describe('InMemoryRepository', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'John Doe', price: 100 })
    await sut.insert(entity)
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('should find an entity by id', async () => {
    const entity = new StubEntity({ name: 'John Doe', price: 100 })
    await sut.insert(entity)
    const foundEntity = await sut.findById(entity.id)
    expect(entity.toJSON()).toStrictEqual(foundEntity?.toJSON())
  })

  it('should find an entity by id not found', async () => {
    await expect(sut.findById('invalid-id')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('should find all entities', async () => {
    const entity = new StubEntity({ name: 'John Doe', price: 100 })
    await sut.insert(entity)
    const foundEntities = await sut.findAll()
    expect(foundEntities).toHaveLength(1)
    expect(foundEntities[0]).toBe(entity)
    expect([entity]).toStrictEqual(foundEntities)
  })

  it('should throw error when update not found entity', async () => {
    const updatedEntity = new StubEntity(
      { name: 'Jane Doe', price: 200 },
      'invalid-id',
    )
    await expect(sut.update(updatedEntity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('should update an entity', async () => {
    const entity = new StubEntity({ name: 'John Doe', price: 120 })
    await sut.insert(entity)
    const updatedEntity = new StubEntity(
      { name: 'Jane Doe', price: 200 },
      entity.id,
    )
    await sut.update(updatedEntity)
    expect(sut.items[0]).toBe(updatedEntity)
    expect(updatedEntity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('should throw error when delete not found entity', async () => {
    await expect(sut.delete('invalid-id')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('should delete an entity', async () => {
    const entity = new StubEntity({ name: 'John Doe', price: 100 })
    await sut.insert(entity)
    await sut.delete(entity.id)
    expect(sut.items).toHaveLength(0)
  })
})
