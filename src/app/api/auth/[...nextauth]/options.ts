import type { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            async profile(profile: GoogleProfile) {
                // console.log("PROFILE", profile);

                return {
                    ...profile,
                    role: profile.role ?? "public",
                    id: profile.sub,
                    image: profile.picture,
                    accessToken: "token mantap",
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ profile, user }) {
            const response = await fetch(`${process.env.API}/auth-member`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: profile?.name,
                    email: profile?.email,
                    mitra_id: 1,
                }),
            });

            if (!response.ok) return false;

            var res = await response.json();
            user.accessToken = res.data.token;
            user.role = "public";
            return true;
        },
        async session({ session, token }) {
            const response = await fetch(
                `${process.env.API}/private/get-profile`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                }
            );

            if (response.ok) {
                var res = await response.json();
                session.tier = {
                    id: res.data.tier.id,
                    name: res.data.tier.name,
                };
            }

            session.accessToken = token.accessToken;
            session.role = token.role;
            // console.log("SESSION", token, session);
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = user.accessToken;
                token.role = user.role;
            }

            return token;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
};
