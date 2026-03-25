import { fakerPT_BR as faker } from '@faker-js/faker'
import { UserProps } from '../../user.entity'

type Props = {
  name?: string
  email?: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
}

export function UserDataBuilder(props: Props): UserProps {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email =
    `${firstName}.${lastName}@${faker.internet.domainName()}`.toLowerCase()
  return {
    name: props.name ?? `${firstName} ${lastName}`,
    email: props.email ?? email,
    password: props.password ?? faker.internet.password(),
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date(),
  }
}
