import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import api from "../utils/ApiRequest";
import { useEffect } from "react";

const SignIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user)
  useEffect(() => {
    if(currentUser ){
     navigate("/")
    }
  })

  // Sign in with Google
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then(
        (result) => {
          console.log(result)
          api
            .post("/auth/google", {
              name: result.user.displayName,
              email: result.user.email,
              img: result.user.photoURL,
            })
            .then((res) => {
              dispatch(loginSuccess(res.data));
              navigate("/")
            });
        }
      )
      .catch(
        (error) => {
          dispatch(loginFailure());
          alert(error.message);
        }
      );
  };

  return (
    <div>
      <section className="text-white body-font h-screen bg-gray-900">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
              <img alt="content" className="object-cover object-center h-full w-full" src="https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" />
            </div>
            <div className="flex flex-col sm:flex-row mt-10 items-center justify-center">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-24 h-24 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <img src="/ProfileImg.png" alt="Profile Image" className="rounded-full"/>
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-white text-lg">Thakur Ankush Singh</h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                  <p className="text-base"> Full Stack Developer with expertise in the MERN stack. With a deep curiosity for web development, I have explored various programming languages and frameworks, ultimately finding my true calling in Full Stack Development.</p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4">I have developed a website that utilizes APIs from Rapid API to fetch live market data for stocks. The website incorporates interactive charts and real-time stock prices to provide users with up-to-date information. Additionally, I have integrated functionality for users to share stock information through WhatsApp and email. This allows users to easily communicate and share market updates with their contacts. The website offers a seamless experience for investors to stay informed and conveniently share insights with others.</p>
                <button onClick={signInWithGoogle} className="bg-teal-700 rounded-lg text-white text-lg px-6 py-3 hover:bg-teal-600 transition-all duration-300 ease-out">Signin with Google</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default SignIn