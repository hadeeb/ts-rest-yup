declare module "zod/external" {
  import { InferType, Schema, ValidationError } from "yup";
  export type ZodError<T = any> = ValidationError;
  export type ZodType<TOutput = any, TInput = TOutput> = Schema<TOutput>;
  export type { ZodType as ZodTypeAny, ZodType as AnyZodObject };
  export type infer<T extends ZodType> = InferType<T>;
  export type input<T extends ZodType> = InferType<T>;
}

declare module "zod" {
  import * as mod from "zod/external";
  export * from "zod/external";
  export { mod as z };
}
