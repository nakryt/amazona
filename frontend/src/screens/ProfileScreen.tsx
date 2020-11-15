import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userInfo, getUserDetails } from "../redux/user-reducer";

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const user = useSelector(userInfo);

  useEffect(() => {
    if (user) dispatch(getUserDetails(user._id));
  }, [user, user?._id, dispatch]);
  return <div></div>;
}
