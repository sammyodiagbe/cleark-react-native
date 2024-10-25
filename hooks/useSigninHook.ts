import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react"


const useSignInHook = () => {
    const { isLoaded, setActive, signIn } = useSignIn();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>();
    const [attemptingSignin, setAttemptingSignin] = useState<boolean>(false)

    const attemptSignIn = async () => {
        if(!isLoaded || !signIn) return;

        try {
            setAttemptingSignin(true)
            const signin = await signIn.create({
                identifier: email,
                password
            });

            if(signin.status === "complete") {
                setAttemptingSignin(false)
                await setActive({ session: signin.createdSessionId})
                router.replace("/(home)")
            }
        }catch(error: any) {
            console.log(JSON.stringify(error, null, 2))

            setAttemptingSignin(false)
        }
    }

    return { email, password, setPassword, setEmail, attemptSignIn, attemptingSignin}

}

export default useSignInHook;