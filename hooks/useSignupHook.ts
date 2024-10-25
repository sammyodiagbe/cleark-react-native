import { ClerkAPIError } from "@/utils/types";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";


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
            router.replace(`/(auth)/verification?email=${email}`)
        }catch(error: any) {
            console.log('Something went wrong')
            console.log(JSON.stringify(error, null, 2))
        }
        
    }

    const verifyUserEmail = async () => {
        // verify the email address that was sent in by user
        if(!isLoaded || !signUp || !verificationCode) return;
        try {
            const verify = await signUp.attemptEmailAddressVerification({ code: verificationCode, });
            if(verify.status === "complete") {
                await setActive({ session: verify.createdSessionId})
                setPendingVerification(false)
                router.replace("/(home)")
            }else if(verify.status === "missing_requirements") {
                await verify.prepareVerification({ strategy: "email_code"})
                setPendingVerification(true)
                setVerificationCode("");
                Alert.alert("Verification code has been sent to your email address")
            }
        }catch(error: any) {
        
            const errorCode = error?.errors[0].code;
            if(error === 'verification_already_verified') {
                
            }

        }
    }



    return { email, password, setEmail, setPassword, pendingVerification, createUserAccount, verifyUserEmail, verificationCode, setVerificationCode};
}

export default useSignupHook;