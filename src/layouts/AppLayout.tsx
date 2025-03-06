import React from "react";
import Navbar from "../components/navbar/Navbar";
import { ActivePage } from "../types/types";

const AppLayout = ({
  children,
  setActivePage,
}: {
  children: React.ReactNode;
  setActivePage: React.Dispatch<React.SetStateAction<ActivePage>>;
}) => {
  return (
    <>
      <Navbar setActivePage={setActivePage} />
      <h1 className="title">Assignment</h1>
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
