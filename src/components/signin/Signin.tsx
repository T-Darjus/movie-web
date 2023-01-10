import React, { useState } from "react";
import "./signin.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

const Signin: React.FC = () => {
  const [createAccount, setCreateAccount] = useState(true);
  const emailCheck: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [signinMsg, setSigninMsg] = useState("");
  const [signupMsg, setSignupMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const { signedIn } = bindActionCreators(actionCreators, dispatch);

  const inputReset = () => {
    setEmail("");
    setPsw("");
  };

  // SIGN IN
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { email: email, password: psw };
    setSuccess(false);

    if (emailCheck.test(email)) {
      await axios
        .post("http://localhost:3000/auth/signin", body)
        .then((response) => {
          localStorage.setItem("token", response.data);
          inputReset();
          setSigninMsg("");
          signedIn(true);
        })
        .catch((err) => setSigninMsg("Email and/or password is incorrect!"));
    } else {
      setSigninMsg("Please enter valid e-mail.");
    }
  };

  // SIGN UP
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { email: email, password: psw };

    if (body.password.length < 8) {
      setSignupMsg("Password must be 8 char. or more.");
      return;
    }

    if (emailCheck.test(email)) {
      return await axios
        .post("http://localhost:3000/auth/signup", body)
        .then((response) => {
          setSigninMsg("Account created. You can now sign in.");
          setCreateAccount(true);
          setSuccess(true);
        })
        .catch((err) => setSignupMsg("Email already exist!"));
    } else {
      setSignupMsg("Please enter valid e-mail.");
    }
  };

  return (
    <div className="main-container">
      {createAccount ? (
        <div className="signin-container">
          <h1>Movie DB</h1>
          <form onSubmit={handleSignIn}>
            <p className={success ? "success" : undefined}>{signinMsg}</p>
            <input
              type="email"
              autoComplete="off"
              id="email"
              required
              placeholder="e-mail"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setSigninMsg("");
              }}
              value={email}
            />
            <input
              type="password"
              id="psw"
              required
              placeholder="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPsw(e.target.value);
                setSigninMsg("");
              }}
              value={psw}
            />

            <button
              className="btn-switch"
              type="button"
              onClick={() => {
                setCreateAccount(false);
              }}
            >
              Create new account
            </button>
            <button type="submit" className="btn">
              Sign in
            </button>
          </form>
        </div>
      ) : (
        <div className="signin-container">
          <h1>Sign up</h1>
          <form onSubmit={handleSignUp}>
            <p className={success ? "success" : undefined}>{signupMsg}</p>
            <input
              type="email"
              autoComplete="off"
              id="email"
              required
              placeholder="e-mail"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setSignupMsg("");
              }}
              value={email}
            />
            <input
              type="password"
              id="psw"
              required
              placeholder="password (min 8 char.)"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPsw(e.target.value);
                setSignupMsg("");
              }}
              value={psw}
            />
            <button
              type="button"
              className="btn-switch"
              onClick={() => {
                setCreateAccount(true);
              }}
            >
              Back to sign in window
            </button>
            <button type="submit" className="btn">
              Sign up
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signin;
