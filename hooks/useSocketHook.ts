
import { socket } from "@/utils/socket";
import { useEffect, useState } from "react";

const useSocketHook = () => {
    useEffect(() => {
        socket.emit("hello")
        socket.on("hello", () => {
            console.log('oh how are you')
        });



        socket.on("disconnect", () => {
            console.log('Connection has been lost')
        })
        return () => {
            socket.disconnect();
        }
    }, [])

    const sendHello = () => {
        socket.emit("new-message", { text: 'How are you doing?'});
    }

    return { sendHello }
}

export default useSocketHook;