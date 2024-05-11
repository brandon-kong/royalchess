import types from '../types/next-auth';

import NextAuth, { Account, NextAuthOptions, Session, User } from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { JWT } from 'next-auth/jwt';

// Providers
import CredentialsProvider from 'next-auth/providers/credentials';

import type { TokenSetParameters } from 'openid-client';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../types/jwt';
import { ErrorResponse } from '..//types/response';
import { AdapterUser } from 'next-auth/adapters';
import { BACKEND_API_URL } from '../constants';

const handler: NextAuthOptions = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
        error: '/auth/login',
    },

    providers: [
        {
            id: 'lichess',
            name: 'Lichess',
            type: 'oauth',

            authorization: {
                url: 'https://www.lichess.org/oauth',

                params: {
                    redirect_uri: `${process.env.NEXTAUTH_URL}callback/lichess/`,
                    client_id: process.env.LICHESS_CLIENT_ID as string,
                    response_type: 'code',
                    code_challenge_method: 'S256',
                    code_challenge: process.env
                        .LICHESS_CODE_CHALLENGE as string,
                    scope: 'email:read preference:read',
                },
            },

            token: {
                url: 'https://lichess.org/api/token',

                async request(context) {
                    const res = await fetch('https://lichess.org/api/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            grant_type: 'authorization_code',
                            client_id: process.env.LICHESS_CLIENT_ID as string,
                            code: context.params.code as string,
                            redirect_uri: `${process.env.NEXTAUTH_URL}callback/lichess/`,
                            code_verifier: context.checks
                                .code_verifier as string,
                        }).toString(),
                    });

                    const data = await res.json();

                    if (!res.status) {
                        throw new Error(
                            data.error_description || 'Failed to fetch token',
                        );
                    }

                    if (data.error) {
                        throw new Error(
                            data.error_description || 'Failed to fetch token',
                        );
                    }

                    const token: TokenSetParameters = {
                        access_token: data.access_token,
                        token_type: data.token_type,
                        expires_in: data.expires_in,
                    };

                    return { tokens: token };
                },
            },

            clientSecret: process.env.LICHESS_CLIENT_SECRET as string,
            clientId: process.env.LICHESS_CLIENT_ID as string,

            idToken: false,

            checks: ['pkce', 'state'],

            userinfo: 'https://lichess.org/api/account',
            accessTokenUrl: 'https://lichess.org/api/token',

            profile: (profile, token) => {
                const user: User = {
                    id: profile.id,
                    name: profile.username,
                    access: token.access_token as string,
                    refresh: '',
                    user: {
                        pk: profile.id,
                        email: profile.email,
                        first_name: profile.firstName,
                        last_name: profile.lastName,
                    },
                };

                return user;
            },
        },

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Email' },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password',
                },
            },
            async authorize(credentials) {
                const res = await fetch(`${BACKEND_API_URL}/auth/login/`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const data = await res.json();

                if (!res.ok) {
                    const errorResponse: ErrorResponse = data as ErrorResponse;
                    throw new Error(errorResponse.code);
                }

                const user = data.user;

                if (res.ok && user) {
                    user.access = data.access;
                    user.refresh = data.refresh;
                    return user;
                } else {
                    return null;
                }
            },
        }),

        CredentialsProvider({
            id: 'credentials-register',
            name: 'credentials-register',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Email' },
                password1: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password',
                },
                password2: {
                    label: 'Confirm Password',
                    type: 'password',
                    placeholder: 'Confirm Password',
                },
            },
            async authorize(credentials) {
                const res = await fetch(
                    `${BACKEND_API_URL}/auth/registration/`,
                    {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { 'Content-Type': 'application/json' },
                    },
                );

                const data = await res.json();

                if (!res.ok) {
                    const errorResponse: ErrorResponse = data as ErrorResponse;
                    throw new Error(errorResponse.code);
                }

                const user = data as User;
                user.email = credentials && credentials.email;

                if (res.ok && user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },

        async jwt({
            token,
            user,
            account,
        }: {
            token: JWT;
            account: Account | null;
            user: User | AdapterUser;
        }) {
            if (account) {
                // retrieve account from provider

                const provider_access_token = account.access_token;

                if (provider_access_token) {
                    const providerAuth = await fetch(
                        `${BACKEND_API_URL}/auth/${account.provider}/`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                access_token: provider_access_token,
                                id_token: account.id_token,
                            }),
                        },
                    );

                    const providerData = await providerAuth.json();

                    if (
                        providerData.success &&
                        providerData.success === false
                    ) {
                        return token;
                    } else {
                        user.access = providerData.access;
                        user.refresh = providerData.refresh;

                        const decoded_token = jwtDecode<JwtPayload>(
                            user.access,
                        );

                        user.id = Number(decoded_token.user_id);
                        user.name =
                            decoded_token.first_name +
                            ' ' +
                            decoded_token.last_name;
                        user.email = decoded_token.email;
                        token.user_implicit_id = decoded_token.user_implicit_id;

                        token.access = providerData.access;
                        token.refresh = providerData.refresh;

                        token.jti = decoded_token.jti;
                        token.exp = decoded_token.exp;
                        token.token_type = decoded_token.token_type;
                        token.user_id = decoded_token.user_id;
                        token.first_name = decoded_token.first_name;
                        token.last_name = decoded_token.last_name;

                        token.email = decoded_token.email;

                        return token;
                    }
                }
            }

            if (user) {
                token.access = user.access;
                token.refresh = user.refresh;

                const decoded_token = jwtDecode<JwtPayload>(token.access);

                user.id = Number(decoded_token.user_id);
                user.name =
                    decoded_token.first_name + ' ' + decoded_token.last_name;
                user.email = decoded_token.email;
                token.user_implicit_id = decoded_token.user_implicit_id;

                token.jti = decoded_token.jti;
                token.exp = decoded_token.exp;
                token.token_type = decoded_token.token_type;
                token.user_id = decoded_token.user_id;
                token.first_name = decoded_token.first_name;
                token.last_name = decoded_token.last_name;

                token.email = decoded_token.email;

                const expiresIn = decoded_token.exp - decoded_token.iat;

                if (expiresIn) {
                    token.exp = Date.now() + expiresIn * 1000;
                } else {
                    token.exp = Date.now() + 60 * 60;
                }

                return token;
            }

            // call verify token endpoint

            const verifyRes = await fetch(
                `${BACKEND_API_URL}/auth/token/verify/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: token.access }),
                },
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success != null && verifyData.success === false) {
                // refresh token

                const refreshRes = await fetch(
                    `${BACKEND_API_URL}/auth/token/refresh/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refresh: token.refresh }),
                    },
                );

                const refreshData = await refreshRes.json();

                if (
                    refreshData.success != null &&
                    refreshData.success === false
                ) {
                    // if refresh fails, sign out
                    throw new Error('Refresh failed');
                }

                if (!refreshRes.ok) {
                    throw new Error('Refresh failed');
                } else {
                    token.access = refreshData.access;
                    token.refresh = refreshData.refresh;

                    return token;
                }
            }

            return token;
        },

        async session({
            session,
            token,
            user,
        }: {
            session: Session;
            token: JWT;
            user: AdapterUser;
        }) {
            if (!token || !token.access) {
                return {} as Session;
            }

            session.access = token.access;
            session.refresh = token.refresh;

            session.user = {
                id: token.user_id,
                email: token.email,
                name: token.first_name + ' ' + token.last_name,
            };

            return session;
        },
    },
};

export default handler;
