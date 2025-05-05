import React from "react";
import NoData from "../components/NoData/noData.jsx";

const NotFound = () => {
  return <NoData onRetry={() => window.location.href = "/"} />;
};

export default NotFound;
