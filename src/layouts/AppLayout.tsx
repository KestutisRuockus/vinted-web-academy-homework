import React from "react";
import Navbar from "../components/navbar/Navbar";
import { ActivePage } from "../types/types";

const AppLayout = ({
  children,
  setActivePage,
  resetQuery,
}: {
  children: React.ReactNode;
  setActivePage: React.Dispatch<React.SetStateAction<ActivePage>>;
  resetQuery: () => void;
}) => {
  return (
    <>
      <Navbar setActivePage={setActivePage} resetQuery={resetQuery} />
      <h1 className="title">Assignment</h1>
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
