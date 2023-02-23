Use Yup schemas in ts-rest

```json
// package.json
{
  "dependencies": {
    "@hadeeb/ts-rest-yup": "hadeeb/ts-rest-yup"
  }
}
```

**Step 1**: Lie to TypeScript that you have [`zod`](https://npm.im/zod) installed, and that it re-exports [`yup`](https://npm.im/yup) types.

```json
// tsconfig.json
{
  "include": ["@hadeeb/ts-rest-yup/types"]
}
```

**Step 2**: Use `Yup2Zod` to add zod-like methods to `yup`.

```ts
import * as Yup from "yup";
import { Yup2Zod } from "@hadeeb/ts-rest-yup";
// Add zod-like methods to Yup
Yup2Zod(Yup);

// Now you can use Yup schemas in ts-rest
import { initContract } from "@ts-rest/core";

const c = initContract();

const appRouter = c.router({
  getUser: {
    method: "GET",
    path: "/user",
    responses: {
      200: Yup.object({
        id: Yup.string().required(),
        full_name: Yup.string().required(),
      }),
    },
  },
});
```
