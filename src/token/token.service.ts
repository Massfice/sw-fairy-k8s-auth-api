import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

import { Auth0TokenRequestDto } from './dto/Auth0TokenRequestDto';
import { CodeExchangeResponseModel } from './models/CodeExchangeResponseModel';

@Injectable()
export class TokenService {
    constructor(private http: HttpService) {}

    codeExchange(code: string) {
        const data = {
            grant_type: 'authorization_code',
            client_id: 'ixIHAKVHg7ksQveRimdvsphtOdkVAbSh',
            client_secret: '5cb_dwwLl6GPNw1ohoCGjkqeFbBRrz_V-KtjtqOTn8h2Gfh5Cb9CBL0WTq1YU9Iw',
            code,
            redirect_uri: 'http://localhost:3000',
        };

        return this.http.post<Auth0TokenRequestDto>('https://dev-9gntu7bd.eu.auth0.com/oauth/token', data).pipe(
            map((response): CodeExchangeResponseModel => {
                const { id_token, access_token } = response.data;

                const tokenPayload = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());

                return { access_token, user: { email: tokenPayload.email, nick: tokenPayload.nickname } };
            }),
        );
    }
}
