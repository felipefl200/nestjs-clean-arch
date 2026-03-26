import { Entity } from '../entities/entity'
import { InMemoryRepository } from './in-memory-repository'
import { SearchableRepositoryInterface } from './searchable-repository-contracts'

export type Filter = {
  filter: string | null
}
export type SortDirection = 'asc' | 'desc'
export type SearchProps = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter
}

export class SearchParams {
  protected _page: number
  protected _perPage: 15
  protected _sort: string | null
  protected _sortDir: SortDirection | null
  protected _filter: Filter
  constructor(props: SearchProps) {
    this._page = props.page
    this._perPage = props.page
    this._sort = props.sort
    this._sortDir = props.sortDir
    this._filter = props.filter
  }
  get page() {
    return this._page
  }

  private set page(value: number) {}

  get perPage() {
    return this._perPage
  }

  private set perPage(value: number) {}

  get sort() {
    return this._sort ?? 'asc'
  }

  private set sort(value: string) {}

  get sortDir() {
    return this._sortDir
  }

  private set sortDir(value: string | null) {}

  get filter() {
    return this._filter
  }

  private set filter(value: Filter) {}
}

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
