import { Entity } from '@/shared/domain/entities/entity'
import { UserValidatorFactory } from './validators/user.validator'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: Date
}

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string
  ) {
    UserEntity.validate(props), super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  updateName(value: string): void {
    UserEntity.validate({ ...this.props, name: value })
    this.name = value
  }

  updateEmail(value: string): void {
    UserEntity.validate({ ...this.props, email: value })
    this.email = value
  }

  updatePassword(value: string): void {
    UserEntity.validate({ ...this.props, password: value })
    this.password = value
  }

  get name(): string {
    return this.props.name
  }

  private set name(name: string) {
    this.props.name = name
  }

  get email(): string {
    return this.props.email
  }

  private set email(email: string) {
    this.props.email = email
  }

  get password(): string {
    return this.props.password
  }

  private set password(password: string) {
    this.props.password = password
  }

  get createdAt(): Date {
    return this.props.createdAt!
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create()
    return validator.validate(props)
  }
}
