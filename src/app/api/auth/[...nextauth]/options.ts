import type { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            async profile(profile: GoogleProfile) {
                console.log(profile)

                return {
                    ...profile,
                    role: profile.role ?? 'public',
                    id: profile.sub,
                    image: profile.picture,
                    accessToken: 'token mantap'
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ profile, user }) {
            const response = await fetch(`${process.env.API}/auth-member`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: profile?.name,
                    email: profile?.email,
                    mitra_id: 1
                })
            })

            if (!response.ok)
                return false;

            var res = await response.json()
            user.accessToken = res.data.token
            user.role = 'public'
            return true
        },
        async session({ session, token, user }) {
            // session.user. = token.id;
            session.accessToken = token.accessToken;
            console.log('SESSION', user)
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user.id;
            }
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }

            console.log('TOKEN', user, profile)
            return token;
        },
        // async jwt({ token, profile, user }) {
        //     // Persist the OAuth access_token and or the user id to the token right after signin
        //     console.log('TOKEN', token, profile, user);

        //     if (user)
        //         token.role = user.role

        //     return token
        // },
        // async session({ session, token, user }) {
        //     // Send properties to the client, like an access_token and user id from a provider.
        //     console.log('SESSION', session, token, user);
        //     if (token && session?.user) {
        //         session.role = token.role
        //         session.accessToken = token.accessToken
        //     }

        //     return session
        // },
    },
    pages: {
        signIn: "/auth/login",
    },
};
