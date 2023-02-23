import * as Yup from "yup";
import { Yup2Zod } from ".";

import { initClient, initContract } from "@ts-rest/core";

Yup2Zod(Yup);

const c = initContract();

const userProfileSchema = Yup.object({
  id: Yup.string().required(),
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
});

const usersRouter = c.router({
  get: {
    method: "GET",
    path: "/user/:userId",
    responses: {
      200: userProfileSchema,
    },
  },
  create: {
    method: "POST",
    path: "/user",
    body: Yup.object({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
    }),
    responses: {
      200: userProfileSchema,
    },
  },
  list: {
    method: "GET",
    path: "/user",
    query: Yup.object({
      page: Yup.number().required(),
    }),
    responses: {
      200: Yup.array(userProfileSchema).required(),
    },
  },
});

const usersClient = initClient(usersRouter, {
  baseUrl: "https://example.com",
  baseHeaders: { "Content-Type": "application/json" },
});

const expectType = <T>(expression: T) => {};

async function test() {
  const userProfile = await usersClient.get({
    params: { userId: "123" },
  });

  if (userProfile.status === 200) {
    expectType<Yup.InferType<typeof userProfileSchema>>(userProfile.body);
  }

  const newUser = await usersClient.create({
    body: { first_name: "", last_name: "" },
  });

  if (newUser.status === 200) {
    expectType<Yup.InferType<typeof userProfileSchema>>(newUser.body);
  }

  const users = await usersClient.list({
    query: { page: 1 },
  });

  if (users.status === 200) {
    expectType<Yup.InferType<typeof userProfileSchema>[]>(users.body);
  }
}

test();
