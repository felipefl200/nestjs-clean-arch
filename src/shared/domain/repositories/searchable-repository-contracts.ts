import { Entity } from '../entities/entity'
import { RepositoryInterface } from './repository-contracts'

export type SortDirection = 'asc' | 'desc'

export type SearchProps<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}

export class SearchParams {
  protected _page: number
  protected _perPage = 15
  protected _sort: string | null
  protected _sortDir: SortDirection | null
  protected _filter: string | null

  constructor(props: SearchProps = {}) {
    this.page = props.page ?? 1
    this.perPage = props.perPage ?? 15
    this.sort = props.sort ?? null
    this.sortDir = props.sortDir ?? 'desc'
    this.filter = props.filter ?? null
  }

  get page() {
    return this._page
  }

  private set page(value: number) {
    let _page = +value
    if (
      typeof _page !== 'number' ||
      _page <= 0 ||
      parseInt(_page as any) !== _page
    ) {
      _page = 1
    }
    this._page = _page
  }

  get perPage() {
    return this._perPage
  }

  private set perPage(value: number) {
    if (typeof value !== 'number') {
      return
    }

    let _perPage = value

    if (
      Number.isNaN(_perPage) ||
      !Number.isInteger(_perPage) ||
      _perPage <= 0
    ) {
      _perPage = this._perPage
    }

    this._perPage = _perPage
  }

  get sort() {
    return this._sort
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`
  }

  get sortDir() {
    return this._sortDir
  }

  private set sortDir(value: SortDirection | null) {
    if (!this.sort) {
      this._sortDir = null
      return
    }
    const dir = `${value}`.toLowerCase()
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir
  }

  get filter() {
    return this._filter
  }

  private set filter(value: string | null) {
    this._filter =
      value === null || value === undefined || value === '' ? null : `${value}`
  }
}

export type SearchResultProps<E extends Entity<unknown>, Filter> = {
  items: E[]
  total: number
  currentPage: number
  perPage: number
  sort: string | null
  sortDir: SortDirection | null
  filter: Filter | null
}

export class SearchResult<E extends Entity<unknown>, Filter = string> {
  public readonly items: E[]
  public readonly total: number
  public readonly currentPage: number
  public readonly perPage: number
  public readonly lastPage: number
  public readonly sort: string | null
  public readonly sortDir: SortDirection | null
  public readonly filter: Filter | null

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items
    this.total = props.total
    this.currentPage = props.currentPage
    this.perPage = props.perPage
    this.lastPage = Math.ceil(this.total / this.perPage)
    this.sort = props.sort ?? null
    this.sortDir = props.sortDir ?? null
    this.filter = props.filter ?? null
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map(item => item.toJSON()) : this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDir: this.sortDir,
      filter: this.filter,
    }
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity<unknown>,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>
}
