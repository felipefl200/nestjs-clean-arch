import { ConflictError } from '@/shared/domain/entities/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/entities/errors/not-found-error'
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable-repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '@/users/domain/repository/repositories/user.repository'

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity, any, any>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity | null> {
    const entity = this.entities.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundError(`User with email ${email} not found`)
    }
    return entity
  }
  async emailExists(email: string): Promise<boolean> {
    const entity = this.entities.some(item => item.email === email)
    if (entity) {
      throw new ConflictError(`User with email ${email} already exists`)
    }
    return !entity
  }
}
