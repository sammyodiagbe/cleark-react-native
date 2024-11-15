import { api } from "@/api";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { createContext, useContext } from "react";

type UserContextType = {
  user: any | null;
};

const UserContext = createContext<UserContextType>({
  user: null,
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user: clerkUser } = useUser();
  const user = useQuery(api.query.users.getUserData, {
    email_address: clerkUser?.emailAddresses[0].emailAddress as string,
  });
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUserContext = () => {
  if (!UserContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return useContext(UserContext);
};
