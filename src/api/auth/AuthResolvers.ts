import { ApolloError, AuthenticationError } from 'apollo-server';
import { getJwtToken } from '../../auth/jwt-config';
import { Inject, Injectable } from '../../di/di';
import { UserService } from '../UserService';

@Injectable()
export class AuthResolvers {
  constructor(@Inject(UserService) private users: UserService) {}

  public async register(
    input: GQL.IRegisterUserInput,
  ): Promise<GQL.IRegisterUserPayload> {
    const { user, emailExistsError } = await this.users.new(input.user);
    if (emailExistsError) {
      throw new ApolloError('email-exists');
    }
    return {
      user: user!!,
      token: getJwtToken(user!!),
    };
  }

  public async loginUser(
    input: GQL.ILoginUserInput,
  ): Promise<GQL.ILoginUserPayload> {
    const result = await this.users.auth(input.email, input.password);
    if (result.userMissing) {
      throw new AuthenticationError('no-email');
    }
    if (result.wrongPass) {
      throw new AuthenticationError('wrong-pass');
    }
    return {
      token: result.token!!,
      user: result.user!!,
    };
  }
}
