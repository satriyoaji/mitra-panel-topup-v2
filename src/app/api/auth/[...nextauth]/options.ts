import type { NextAuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { GetCredHeader } from "../../api-utils";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) {
        var credentialHeader = GetCredHeader();

        const response = await fetch(`${process.env.API}/member/login`, {
          method: "POST",
          headers: {
            "X-Sign": credentialHeader.sign,
            "X-User-Id": credentialHeader.mitraid,
            "X-Timestamp": credentialHeader.timestamp.toString(),
          },
          body: JSON.stringify({
            email: credentials?.username,
            password: credentials?.password,
          }),
        });

        var res = await response.json();

        if (!response.ok) return res.data;
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ profile, user }) {
      // const response = await fetch(
      //     `${process.env.NEXT_PUBLIC_API}/auth-member`,
      //     {
      //         method: "POST",
      //         headers: {
      //             Accept: "application/json",
      //             "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({
      //             name: profile?.name,
      //             email: profile?.email,
      //             mitra_id: 1,
      //         }),
      //     }
      // );

      // if (!response.ok) return false;

      // var res = await response.json();
      var res = {
        status: "SUCCESS",
        code: "0000",
        data: {
          uuid: "ad4ff31f-a2c1-403a-9c5a-4aaea01f2033",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklEIjoxLCJ1dWlkIjoiYWQ0ZmYzMWYtYTJjMS00MDNhLTljNWEtNGFhZWEwMWYyMDMzIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMDZUMDU6NDI6MjMuMzUyMDE4KzA3OjAwIiwidXBkYXRlZF9hdCI6IjIwMjMtMTItMTdUMTY6NTY6MDAuOTA4OTgxKzA3OjAwIiwibmFtZSI6Ik1lbWJlciAxIiwiZW1haWwiOiJtZW1iZXIxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjp7IlN0cmluZyI6IiIsIlZhbGlkIjpmYWxzZX0sInBob25lIjp7IlN0cmluZyI6IjYyODcxOTA0ODcyOTAiLCJWYWxpZCI6dHJ1ZX0sInJvbGVfaWQiOjEsInJvbGUiOnsiaWQiOjAsImNyZWF0ZWRfYXQiOiIwMDAxLTAxLTAxVDAwOjAwOjAwWiIsInVwZGF0ZWRfYXQiOiIwMDAxLTAxLTAxVDAwOjAwOjAwWiIsIm5hbWUiOiIiLCJjb2RlIjoiIn0sIm1pdHJhX2lkIjoxLCJ0aWVyX2lkIjoxLCJ0aWVyIjpudWxsfSwiZXhwIjoxNzAzMTI3MzE5fQ.xfxOjN6RAebq3EnaNEpNmXRPGct94D5VkyRpN46q4mA",
          is_super_admin: false,
        },
        pagination: null,
        error_message: null,
      };
      user.accessToken = res.data.token;
      user.role = "customer";
      return true;
    },
    async session({ session, token }) {
      // const response = await fetch(
      //     `${process.env.NEXT_PUBLIC_API}/web/get-profile`,
      //     {
      //         method: "GET",
      //         headers: {
      //             Accept: "application/json",
      //             "Content-Type": "application/json",
      //             Authorization: `Bearer ${token.accessToken}`,
      //         },
      //     }
      // );

      // if (response.ok) {
      //     var res = await response.json();
      //     session.tier = {
      //         id: res.data.tier.id,
      //         name: res.data.tier.name,
      //     };
      //     session.phone = res.data.phone;
      // }
      var res = {
        status: "SUCCESS",
        code: "0000",
        data: {
          id: 1,
          uuid: "ad4ff31f-a2c1-403a-9c5a-4aaea01f2033",
          created_at: "2023-12-06T05:42:23.352018+07:00",
          updated_at: "2023-12-13T09:19:45.423873+07:00",
          name: "Member 1",
          email: "member1@gmail.com",
          phone: "6287190487290",
          role: {
            id: 1,
            created_at: "2023-12-06T05:42:03.565684+07:00",
            updated_at: "2023-12-06T05:42:03.565684+07:00",
            name: "Buyer (Member)",
            code: "member",
          },
          mitra: {
            uuid: "f9f91ff7-dfa9-4031-9fe6-93839bf23ccd",
            username: "topmur",
          },
          tier: {
            id: 1,
            created_at: "2023-12-06T05:42:03.565684+07:00",
            updated_at: "2023-12-06T05:42:03.565684+07:00",
            name: "Public",
          },
        },
        pagination: null,
        error_message: null,
      };
      session.tier = {
        id: res.data.tier.id,
        name: res.data.tier.name,
      };
      session.phone = res.data.phone;
      session.accessToken = token.accessToken;
      session.role = token.role;

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
