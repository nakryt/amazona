import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NavLink, Redirect, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  signIn,
  userInfo,
  loading as loadingSelector,
  error as errorSelector,
} from "../redux/user-reducer";
import LoadingBox from "../components/ui/LoadingBox/LoadingBox";
import MessageBox from "../components/ui/MessageBox";

const SignInScreen: React.FC<RouteComponentProps> = ({ location, history }) => {
  const dispatch = useDispatch();
  const user = useSelector(userInfo);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (user) history.push(redirect);
  }, [user, redirect, history]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Redirect to="/" />;

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <h1>Sign In</h1>
        {loading ? (
          <LoadingBox style={{ fontSize: "2rem", flexDirection: "row" }} />
        ) : error ? (
          <MessageBox variant="danger" style={{ marginBottom: 13 }}>
            {error}
          </MessageBox>
        ) : null}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit" disabled={loading}>
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{" "}
            <NavLink to={`/register?redirect=${redirect}`}>
              Create new account
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInScreen;
