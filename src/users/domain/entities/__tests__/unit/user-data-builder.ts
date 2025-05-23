import { faker } from '@faker-js/faker/locale/pt_BR'
import { UserProps } from '../../user.entity'

export function UserDataBuilder(props: Partial<UserProps> = {}): UserProps {
  return {
    name: props.name || faker.person.fullName(),
    email: props.email || faker.internet.email(),
    password: props.password || faker.internet.password(),
    createdAt: props.createdAt || new Date(),
  }
}
