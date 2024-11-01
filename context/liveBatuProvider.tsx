import { api } from "@/api";
import { Id } from "@/convex/_generated/dataModel";
import { Batu } from "@/utils/types";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { createContext, useContext, useEffect, useState } from "react";

interface TLiveBatu {
  liveBatu: Batu | null;
  isInLiveBatu: boolean;
}

const liveBatuContext = createContext<TLiveBatu>({
  liveBatu: null,
  isInLiveBatu: false,
});

export default function LiveBatuProvider() {
  const { user } = useUser();
  const [batu, setLiveBatu] = useState<Batu | null>();
  const livebatu: Batu = useQuery(api.query.batuQueries.getActiveLiveBatu);
  const isInLiveBatu: boolean = useQuery(
    api.query.batuQueries.checkUserInLive,
    {
      liveBatuId: batu?._id as Id<"livebatu">,
      userId: user?.id ?? "",
    }
  );
  useEffect(() => {
    setLiveBatu(livebatu);
  }, [livebatu]);
  return (
    <liveBatuContext.Provider
      value={{ liveBatu: batu ?? null, isInLiveBatu }}
    ></liveBatuContext.Provider>
  );
}

export const useLiveBatuContext = () => {
  const context = useContext(liveBatuContext);
  if (!context) {
    throw new Error("Context can never be null");
  }
  return context;
};
