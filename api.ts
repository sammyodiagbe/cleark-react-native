import { FunctionReference, anyApi } from "convex/server";
import { GenericId as Id } from "convex/values";

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
  createTask: {
    createTask: FunctionReference<
      "mutation",
      "public",
      { description: string; name: string },
      any
    >;
  };
  query: {
    getTasks: { getTasks: FunctionReference<"query", "public", any, any> };
    getLiveBatu: {
      getActiveBatu: FunctionReference<
        "query",
        "public",
        Record<string, never>,
        any
      >;
    };
  };
  liveBatus: {
    resetLiveBatu: {
      createNewBatu: FunctionReference<"action", "public", any, any>;
    };
  };
};
export type InternalApiType = {};
