import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "@/prisma/prisma";
import * as trpc from "@trpc/server";
import bcrypt from "bcryptjs";

export const appRouter = router({
  getUsers: procedure.query(({ ctx }) => {
    return prisma.user.findMany();
  }),
  newUser: procedure
    .input(
      z.object({
        firstname: z.string(),
        lastname: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return signup(input);
    }),
});

export type AppRouter = typeof appRouter;

async function signup(input: any) {
  try {
    const { email, password } = input;

    if (password.trim().length < 6) {
      throw new trpc.TRPCError({
        code: "BAD_REQUEST",
        message: "Password should have minimum 6 characters",
      });
    }

    const user_exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user_exist) {
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        ...input,
        password: hashedPassword,
      },
    });

    // const accessToken = signJwt(
    //   { id: user.id, email: user.email },
    //   accessTokenPrivateKey,
    //   {
    //     expiresIn: process.env.ACCESS_TOKEN_TTL,
    //   }
    // );

    // const refreshToken = signJwt(
    //   { id: user.id, email: user.email },
    //   refreshTokenPrivateKey,
    //   {
    //     expiresIn: process.env.REFRESH_TOKEN_TTL,
    //   }
    // );

    return {
      message: "Signup Successful, please proceed to login",
      status: "success",
      user,
      // accesstoken,
      // refreshToken,
    };
  } catch (error: any) {
    throw new trpc.TRPCError(error);
  }
}
