import React from "react";
import Navbar from "../components/navbar/Navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <h1 className="title">Assignment</h1>
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
