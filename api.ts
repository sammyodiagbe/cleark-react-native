import { FunctionReference, anyApi } from "convex/server";
import { GenericId as Id } from "convex/values";

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
  mutations: {
    batu: {
      joinBatu: FunctionReference<
        "mutation",
        "public",
        { batuId: Id<"livebatu">; userId: string },
        any
      >;
    };
    livebatuMutations: {
      updateUserGameBatu: FunctionReference<
        "mutation",
        "public",
        { data: { dataId: Id<"livebatudata">; score: number; time: number } },
        any
      >;
    };
  };
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
      getUserBatuData: FunctionReference<
        "query",
        "public",
        { batuId: Id<"livebatu">; userId: string },
        any
      >;
      getLiveBatuData: FunctionReference<
        "query",
        "public",
        { batuId: Id<"livebatu"> },
        any
      >;
    };
    users: {
      getUserData: FunctionReference<
        "query",
        "public",
        { email_address: string },
        any
      >;
    };
  };
};
export type InternalApiType = {};
