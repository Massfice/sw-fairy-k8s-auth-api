import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { map, catchError, concatMap } from 'rxjs/operators';
import { Http as httpStatus } from '@status/codes';

import { DaprAuthApiSecrectDto } from './dto/DaprAuthApiSecrectDto';
import { Auth0TokenRequestDto } from './dto/Auth0TokenRequestDto';

const daprPort = process.env.DAPR_PORT || 3500;
const redirectUri = process.env.TOKEN_REDIRECT_URI || 'https://shinobi-war-fairy.online';

@Injectable()
export class TokenService {
    constructor(private http: HttpService) {}

    codeExchange(code: string) {
        return this.http
            .get<DaprAuthApiSecrectDto>(
                `http://localhost:${daprPort}/v1.0/secrets/kubernetes/auth-api?metadata.namespace=default`,
            )
            .pipe(
                concatMap((response) => {
                    const [clientId, clientSecret] = response.data.clientCredentials.split('.');

                    return this.http.post<Auth0TokenRequestDto>('https://dev-9gntu7bd.eu.auth0.com/oauth/token', {
                        grant_type: 'authorization_code',
                        client_id: clientId,
                        client_secret: clientSecret,
                        code,
                        redirect_uri: redirectUri,
                    });
                }),
                map((response) => {
                    const { id_token, access_token } = response.data;

                    const tokenPayload = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());

                    return {
                        access_token,
                        user: { email: tokenPayload.email, nick: tokenPayload.nickname },
                    };
                }),
                catchError((err) => {
                    const { error = null } = err.response && err.response.data ? err.response.data : {};

                    if (error === 'invalid_grant') {
                        throw new HttpException('Invalid code', httpStatus.Forbidden);
                    }

                    throw err;
                }),
            );
    }
}
