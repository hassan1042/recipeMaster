import React, { useState } from 'react';
import { useAuthContext } from '../contexts/authContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGoogle } from '@fortawesome/free-solid-svg-icons';


function LoginPage() {
  const {userSignIn, toggleSignIn, signActive, googleSignIn} = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    userSignIn(email, password);
    setEmail("");
    setPassword("");
  };
  const handleSignIn = () => {
    toggleSignIn();
  }
  const handleGoogleSignIn = () => {
      googleSignIn();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">{signActive ? "Sign Up" : "Log In"} to Recipe Master</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">Email:</label>
            <input
              type="text"
              id="email"
              className="mt-1 p-2 w-full  border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button 
          type="submit"
           className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300">
            {signActive ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600">{signActive ? "Already have an account?" : "Not with us yet?"}</p>
        <button onClick={handleSignIn} className="text-blue-500 hover:underline font-semibold">
         {signActive ? " Login with your existing account" : "Join us Now!!"}
        </button>
      </div>
      <div className="mt-8 text-center">
        <button onClick={handleGoogleSignIn} className="text-blue-500 hover:underline font-semibold">
       Log In with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
