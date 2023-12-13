import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken: sring;
        role: string;
        phone: string;
        tier: {
            name: string;
            id: number;
        };
    }

    interface User extends DefaultUser {
        accessToken: sring;
        role: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string;
        accessToken: string;
    }
}
