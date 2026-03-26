import { Entity } from '../entities/entity'
import { InMemoryRepository } from './in-memory-repository'
import { SearchableRepositoryInterface } from './searchable-repository-contracts'

export abstract class InMemorySearchableRepository<
  E extends Entity<unknown>,
  SearchInput,
  SearchOutput,
>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, SearchInput, SearchOutput>
{
  search(props: SearchInput): Promise<SearchOutput> {
    throw new Error('Method not implemented.')
  }
}
