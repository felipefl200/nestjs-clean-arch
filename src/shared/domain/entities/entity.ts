import { randomUUID } from 'node:crypto'

export abstract class Entity<T> {
  public readonly _id: string
  public readonly props: T

  constructor(props: T, id?: string) {
    this.props = props
    this._id = id || randomUUID()
  }

  get id() {
    return this.id
  }

  toJSON() {
    return {
      id: this._id,
      ...this.props,
    }
  }
}
