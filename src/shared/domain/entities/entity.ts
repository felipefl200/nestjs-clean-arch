import { randomUUID } from 'node:crypto'

export abstract class Entity<Props> {
  public readonly _id: string
  public readonly props: Props

  constructor(props: Props, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }

  get id() {
    return this._id
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>
  }
}
