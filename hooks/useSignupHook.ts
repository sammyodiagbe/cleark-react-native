import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";


const useSignupHook = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    
    const [pendingVerification, setPendingVerification] = useState<boolean>(false)
    const [email, setEmail ] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [verificationCode, setVerificationCode] = useState<string>()

    const createUserAccount = async () => {
        if(!isLoaded || !signUp) return;
        try {
            const signup = await signUp.create({
                emailAddress: email,
                password
            });
            await signup.prepareEmailAddressVerification({strategy: "email_code"});
            setPendingVerification(true)
        }catch(error) {
            console.log(error)
        }
        
    }

    const verifyUserEmail = async () => {
        // verify the email address that was sent in by user
        if(!isLoaded || !signUp || !verificationCode) return;
        try {
            const verify = await signUp.attemptEmailAddressVerification({ code: verificationCode });
            if(verify.status === "complete") {
                await setActive({ session: verify.createdSessionId})
                router.replace("/(home)")
            }else if(verify.status === "missing_requirements") {
                console.log(verify.status)
            }
        }catch(error) {
            console.log(error)
        }
    }



    return { email, password, setEmail, setPassword, pendingVerification, createUserAccount, verifyUserEmail};
}

export default useSignupHook;