import { FunctionReference, anyApi } from "convex/server";
import { GenericId as Id } from "convex/values";

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
  query: {
    batuQueries: {
      getActiveLiveBatu: FunctionReference<
        "query",
        "public",
        Record<string, never>,
        any
      >;
      checkUserInLive: FunctionReference<
        "query",
        "public",
        { liveBatuId: Id<"livebatu">; userId: string },
        any
      >;
      getBatuQuestionData: FunctionReference<
        "query",
        "public",
        { liveBatuId: Id<"livebatu"> },
        any
      >;
    };
  };
};
export type InternalApiType = {};
