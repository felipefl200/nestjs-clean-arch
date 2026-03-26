import { ConflictError } from '@/shared/domain/entities/errors/conflict-error'
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory-repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '@/users/domain/repository/repositories/user.repository'
import { NotFoundException } from '@nestjs/common'

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity | null> {
    const entity = this.entities.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundException(`User with email ${email} not found`)
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
