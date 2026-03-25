import { Entity } from '@/shared/domain/entities/entity'
import { UserValidatorFactory } from '../validators/user.validator'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    UserEntity.validate(props)
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
    UserEntity.validate({ ...this.props, ...props })
    Object.assign(this.props, props, { updatedAt: new Date() })
  }

  updatePassword(password: string) {
    UserEntity.validate({ ...this.props, password })
    this.password = password
  }

  static validate(props: UserProps): void {
    const validator = UserValidatorFactory.create()
    validator.validate(props)
  }
}
