import { SearchParams } from '../../searchable-repository-contracts'

describe('Searchable Repository Contracts Unit Test', () => {
  describe('SearchParams', () => {
    it('page prop', () => {
      const sut = new SearchParams()
      expect(sut.page).toBe(1)
    })

    const params = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5.5, expected: 1 },
      { page: 2, expected: 2 },
      { page: {}, expected: 1 },
    ]

    params.forEach(param => {
      it(`should set page ${param.page} as ${param.expected}`, () => {
        const sut = new SearchParams({ page: param.page as any })
        expect(sut.page).toBe(param.expected)
      })
    })

    const perPageParams = [
      { perPage: null, expected: 15 },
      { perPage: undefined, expected: 15 },
      { perPage: true, expected: 15 },
      { perPage: false, expected: 15 },
      { perPage: 0, expected: 15 },
      { perPage: -1, expected: 15 },
      { perPage: 5.5, expected: 15 },
      { perPage: 2, expected: 2 },
      { perPage: {}, expected: 15 },
    ]

    perPageParams.forEach(param => {
      it(`should set perPage ${param.perPage} as ${param.expected}`, () => {
        const sut = new SearchParams({ perPage: param.perPage as any })
        expect(sut.perPage).toBe(param.expected)
      })
    })

    const sortParams = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: true, expected: 'true' },
      { sort: false, expected: 'false' },
      { sort: '', expected: null },
      { sort: 0, expected: '0' },
      { sort: -1, expected: '-1' },
      { sort: 5.5, expected: '5.5' },
      { sort: 2, expected: '2' },
      { sort: {}, expected: '[object Object]' },
    ]

    sortParams.forEach(param => {
      it(`should set sort ${param.sort} as ${param.expected}`, () => {
        const sut = new SearchParams({ sort: param.sort as any })
        expect(sut.sort).toBe(param.expected)
      })
    })

    const sortDirParams = [
      { sortDir: null, expected: 'desc' },
      { sortDir: undefined, expected: 'desc' },
      { sortDir: 'asc', expected: 'asc' },
      { sortDir: 'desc', expected: 'desc' },
      { sortDir: 'ASC', expected: 'asc' },
      { sortDir: 'DESC', expected: 'desc' },
      { sortDir: 'invalid', expected: 'desc' },
      { sortDir: true, expected: 'desc' },
      { sortDir: false, expected: 'desc' },
      { sortDir: 0, expected: 'desc' },
      { sortDir: -1, expected: 'desc' },
      { sortDir: 5.5, expected: 'desc' },
      { sortDir: 2, expected: 'desc' },
      { sortDir: {}, expected: 'desc' },
    ]

    sortDirParams.forEach(param => {
      it(`should set sortDir ${param.sortDir} as ${param.expected}`, () => {
        const sut = new SearchParams({
          sort: 'id',
          sortDir: param.sortDir as any,
        })
        expect(sut.sortDir).toBe(param.expected)
      })
    })

    const filterParams = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: true, expected: 'true' },
      { filter: false, expected: 'false' },
      { filter: '', expected: null },
      { filter: 0, expected: '0' },
      { filter: -1, expected: '-1' },
      { filter: 5.5, expected: '5.5' },
      { filter: 2, expected: '2' },
      { filter: {}, expected: '[object Object]' },
    ]

    filterParams.forEach(param => {
      it(`should set filter ${param.filter} as ${param.expected}`, () => {
        const sut = new SearchParams({ filter: param.filter as any })
        expect(sut.filter).toBe(param.expected)
      })
    })
  })
})
