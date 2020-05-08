import React, { useEffect } from "react";

const RedirectPage = ({ history }) => {
  useEffect(() => {
    history.push("/breakdown");
  });

  return <></>;
};

export default RedirectPage;
