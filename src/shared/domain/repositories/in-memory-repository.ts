import { Entity } from '../entities/entity'
import { NotFoundError } from '../entities/errors/not-found-error'
import { RepositoryInterface } from './repository-contracts'

export abstract class InMemoryRepository<
  E extends Entity<unknown>,
> implements RepositoryInterface<E> {
  protected entities: E[] = []

  async insert(entity: E): Promise<void> {
    this.entities.push(entity)
  }

  async findById(id: string): Promise<E | null> {
    return this._get(id)
  }

  async findAll(): Promise<E[]> {
    return this.entities
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id)
    const index = this.entities.findIndex(entity => entity.id === entity.id)
    this.entities[index] = entity
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    const index = this.entities.findIndex(entity => entity.id === id)
    this.entities.splice(index, 1)
  }

  protected async _get(id: string): Promise<E> {
    const entity = this.entities.find(entity => entity.id === id)
    if (!entity) {
      throw new NotFoundError('Entity not found')
    }
    return entity
  }
}
