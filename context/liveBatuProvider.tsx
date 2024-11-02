import { api } from "@/api";
import { Id } from "@/convex/_generated/dataModel";
import { Batu } from "@/utils/types";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TLiveBatu {
  liveBatu: Batu | null;
  isInLiveBatu: boolean;
}

const liveBatuContext = createContext<TLiveBatu>({
  liveBatu: null,
  isInLiveBatu: false,
});

export default function LiveBatuProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useUser();
  const livebatu: Batu = useQuery(api.query.batuQueries.getActiveLiveBatu);
  const isInLiveBatu: boolean = useQuery(
    api.query.batuQueries.checkUserInLive,
    {
      liveBatuId: livebatu?._id as Id<"livebatu">,
      userId: user?.id ?? "",
    }
  );

  return (
    <liveBatuContext.Provider
      value={{ liveBatu: livebatu ?? null, isInLiveBatu }}
    >
      {children}
    </liveBatuContext.Provider>
  );
}

export const useLiveBatuContext = () => {
  const context = useContext(liveBatuContext);
  if (!context) {
    throw new Error("Context can never be null");
  }
  return context;
};
