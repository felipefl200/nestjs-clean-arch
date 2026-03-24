import { Entity } from '@/shared/domain/entities/entity'

export type UserProps = {
  id: string
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
