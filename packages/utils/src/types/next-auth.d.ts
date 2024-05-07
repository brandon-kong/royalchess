import { UUID } from 'crypto';
import NextAuth, { Account, DefaultSession, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        access?: string;
        refresh?: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }
}

declare module 'next-auth' {
    interface User {
        id: number;
        access: string;
        refresh: string;
        user: {
            pk: number;
            email: string;
            first_name: string;
            last_name: string;
        };
    }

    interface AdapterUser {
        id: number;
        first_name: string;
        last_name: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        access?: Account.accessToken;
        refresh?: Account.refreshToken;
        exp: number;
        user_id: number;
        user_implicit_id: UUID;
        first_name: string;
        last_name: string;
        email: string;
        token_type: string;
        jti: string;
    }
}
