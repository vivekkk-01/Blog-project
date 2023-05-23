import React from "react";
import PublicNavbar from "./Public/PublicNavbar";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import { useSelector } from "react-redux";
import AccountVerificationAlert from "../AccountVerificationAlert";

const Navbar = () => {
  const { userAuth } = useSelector((state) => state.user);

  return (
    <>
      {!userAuth ? (
        <PublicNavbar />
      ) : userAuth && !userAuth.isAdmin ? (
        <PrivateNavbar userAuth={userAuth} />
      ) : (
        userAuth && userAuth.isAdmin && <AdminNavbar userAuth={userAuth} />
      )}
      {userAuth && !userAuth?.isAccountVerified && <AccountVerificationAlert />}
    </>
  );
};

export default Navbar;
