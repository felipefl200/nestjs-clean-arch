import { Entity } from '../entities/entity'
import { RepositoryInterface } from './repository-contracts'

export abstract class InMemoryRepository<
  E extends Entity<unknown>,
> implements RepositoryInterface<E> {
  protected entities: E[] = []

  async insert(entity: E): Promise<void> {
    this.entities.push(entity)
  }

  async findById(id: string): Promise<E | null> {
    return this.entities.find(entity => entity.id === id) ?? null
  }

  async findAll(): Promise<E[]> {
    return this.entities
  }

  async update(entity: E): Promise<void> {
    const index = this.entities.findIndex(entity => entity.id === entity.id)
    if (index === -1) {
      throw new Error('Entity not found')
    }
    this.entities[index] = entity
  }

  async delete(id: string): Promise<void> {
    const index = this.entities.findIndex(entity => entity.id === id)
    if (index === -1) {
      throw new Error('Entity not found')
    }
    this.entities.splice(index, 1)
  }
}
