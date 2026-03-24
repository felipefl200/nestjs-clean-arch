export type UserProps = {
  id: string
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export class UserEntity {
  constructor(private readonly props: UserProps) {
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.updatedAt = this.props.updatedAt ?? new Date()
  }

  get id(): string {
    return this.props.id
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

  set name(value: string) {
    this.props.name = value
    this.props.updatedAt = new Date()
  }

  set email(value: string) {
    this.props.email = value
    this.props.updatedAt = new Date()
  }

  set password(value: string) {
    this.props.password = value
    this.props.updatedAt = new Date()
  }
}
