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
  })
})
