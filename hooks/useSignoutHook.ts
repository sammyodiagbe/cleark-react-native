import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";


export default function useSignoutHook() {

    const { signOut } = useClerk()

    const signout = async () => {
        await signOut();
        router.replace("/(auth)/signin");
    }

    return { signout}
}