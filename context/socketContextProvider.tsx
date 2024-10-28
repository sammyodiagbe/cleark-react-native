import { socket } from "@/utils/socket";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type TSocket = {
  socket: typeof Socket | null;
};

const socketContext = createContext<TSocket>({
  socket: null,
});

export default function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socketInstance, setSocketInstance] = useState<typeof Socket | null>(
    null
  );

  useEffect(() => {
    setSocketInstance(socket);

    () => {
      socketInstance?.disconnect();
    };
  }, []);
  return (
    <socketContext.Provider value={{ socket: socketInstance }}>
      {children}
    </socketContext.Provider>
  );
}

export const useSocketContext = () => {
  const context = useContext(socketContext);
  if (!context) {
    throw new Error("Context not valid or context not provided");
  }
  return context;
};
