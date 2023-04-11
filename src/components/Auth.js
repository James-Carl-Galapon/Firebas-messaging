import {auth,provider} from '../firebase-config'
import {signInWithPopup} from 'firebase/auth'
import Cookies from 'universal-cookie'
import '../styles/Auth.css'
export const Auth = (props) => {

    const {setIsAuth} = props;
    const cookies = new Cookies();

    const signInWithGoogle = async () => {
        try {
       const result = await signInWithPopup(auth, provider);
       console.log(result);
       cookies.set("auth-token",result.user.refreshToken)
       setIsAuth(true);
        } catch(err) {
            console.error(err);
        }
    }


    return <div className="auth ">
        <p>SIMPLE FREE MESSAGING <br /> WEB APP</p> 
        <button onClick={signInWithGoogle}>Sign-in with Google to Continue</button>
        </div>
        
}