import { an } from 'vitest/dist/chunks/reporters.d.CZ5E0GCT'
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
  protected _perPage: number
  protected _sort: string | null
  protected _sortDir: SortDirection | null
  protected _filter: Filter
  constructor(props: SearchProps = {}) {
    this._page = props.page ?? 1
    this._perPage = props.perPage ?? 15
    this._sort = props.sort ?? null
    this._sortDir = props.sortDir ?? null
    this._filter = props.filter ?? { filter: null }
  }
  get page() {
    return this._page
  }

  private set page(value: number) {
    let _page = +value || 1
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1
    }
    this._page = _page
  }

  get perPage() {
    return this._perPage
  }

  private set perPage(value: number) {
    let _perPage = +value || 15
    if (
      Number.isNaN(_perPage) ||
      _perPage <= 0 ||
      parseInt(_perPage as any) !== _perPage
    ) {
      _perPage = 15
    }
    this._perPage = _perPage
  }

  get sort() {
    return this._sort ?? 'asc'
  }

  private set sort(value: string) {
    this._sort =
      value === null || value === undefined || value === '' ? null : value
  }

  get sortDir() {
    return this._sortDir
  }

  private set sortDir(value: string | null) {
    if (!this._sort) {
      this._sortDir = null
      return
    }
    const SortDirection = this._sortDir?.toLocaleLowerCase() as SortDirection
    this._sortDir =
      SortDirection === 'asc' || SortDirection === 'desc'
        ? SortDirection
        : 'desc'
  }

  get filter() {
    return this._filter
  }

  private set filter(value: Filter) {
    this._filter =
      value === null || value === undefined || value.filter === ''
        ? { filter: null }
        : value
  }
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
