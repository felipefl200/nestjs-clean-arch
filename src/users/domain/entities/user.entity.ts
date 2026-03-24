import { Entity } from '@/shared/domain/entities/entity'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date()
  }

  get updatedAt(): Date {
    return this.props.updatedAt ?? new Date()
  }

  private set name(value: string) {
    this.props.name = value
    this.props.updatedAt = new Date()
  }

  private set email(value: string) {
    this.props.email = value
    this.props.updatedAt = new Date()
  }

  private set password(value: string) {
    this.props.password = value
    this.props.updatedAt = new Date()
  }

  update(props: Partial<UserProps>) {
    Object.assign(this.props, props, { updatedAt: new Date() })
  }
}
