import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup} from 'firebase/auth';
import { auth , provider } from '../utils/firebase';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import axios from 'axios';
import { useState } from 'react';

function Auth({ isModel = false }){
    const dispatch = useDispatch()
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

const handleGoogleAuth = async() => {
    if (isSigningIn) return

    setIsSigningIn(true)
    setErrorMessage('')

    try {  
        const response = await signInWithPopup(auth,provider)
        const user = response.user
        const name = user.displayName
        const email = user.email
        if (!name || !email) {
            throw new Error('Google did not return a name and email. Please try another Google account.')
        }

        const result = await axios.post(ServerUrl + "/api/auth/google" ,
            {name, email} ,{ withCredentials : true} )
            dispatch(setUserData(result.data))
    }catch(error){
        console.error('Google sign-in failed:', error)
        if (error?.code === 'auth/unauthorized-domain') {
            setErrorMessage('This address is not allowed by Firebase. Open the app at http://localhost:5173, or add this domain in Firebase Authentication > Settings > Authorized domains.')
        } else if (error?.code === 'auth/popup-blocked') {
            setErrorMessage('Your browser blocked the Google sign-in window. Allow pop-ups and try again.')
        } else if (error?.code === 'auth/popup-closed-by-user') {
            setErrorMessage('The Google sign-in window was closed before sign-in finished. Click Continue with Google and complete the sign-in.')
        } else if (axios.isAxiosError(error)) {
            setErrorMessage(error.response?.data?.message || 'Google sign-in succeeded, but the server could not finish creating your account. Check that the API and database are running, then try again.')
        } else {
            setErrorMessage(error instanceof Error ? error.message : 'Google sign-in failed. Please try again.')
        }
    } finally {
        setIsSigningIn(false)
    }
}

    return(
       <div className={isModel ? 'w-full' : 'w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20'}>
        <motion.div
        initial={{opacity:0 ,y:-40}}
        animate={{opacity:1 , y:0}}
        transition={{duration:1.05}} 
        className={`w-full ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"} bg-white shadow-2xl border border-gray-200`}>
            <div className='flex items-center justify-center gap-3 mb-6'>
             <div className='bg-black text-white p-2 rounded-lg'>
               <BsRobot size={18}/>
             </div>
             <h2
              className='font-semibold text-lg'>AI_INTERVIEW</h2>
            </div>
            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
                Continue with{" "}
                <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                    <IoSparkles size={16}/>
                    AI Smart Interview
                </span>
            </h1>
            <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
                SignIn to start AI powered mock interviews
            </p>

            {errorMessage && (
                <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                </p>
            )}

            <motion.button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isSigningIn}
            whileHover={{opacity:0.9 , scale:1.03}}
            whileTap={{opacity:1 , scale:0.98}} 
            className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md disabled:cursor-wait disabled:opacity-60'>
               <FcGoogle size={20} />
               {isSigningIn ? 'Signing in…' : 'Continue with Google'}
            </motion.button>
        </motion.div>
       </div>
    )
}
export default Auth