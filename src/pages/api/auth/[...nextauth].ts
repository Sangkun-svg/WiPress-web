import { supabase } from "@/utils/database";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      credentials: {
        phoneNumber: {
          label: "휴대폰 번호",
          type: "text",
          placeholder: "휴대폰 번호를 입력해주세요",
        },
        password: { label: "비밀번호를 입력해주세요", type: "password" },
      },
      async authorize(credentials, req) {
        let isValidPassword = false;
        const { phoneNumber, password } = credentials as {
          phoneNumber: string;
          password: string;
        };
        const { data: users, error } = await supabase
          .from("User")
          .select("id,phoneNumber,password,profile,type,role")
          .eq("phoneNumber", phoneNumber);
        const user = users?.[0];
        if (user) {
          isValidPassword = await verifyPassword(password, user.password);
          if (isValidPassword) return user!;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        console.log("JWT user ",user)
        token.user = {};
        token.user.id = user.id;
        token.user.profile = user.profile;
        token.user.type = user.type;
        token.user.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET_KEY!,
};

export default NextAuth(authOptions);
