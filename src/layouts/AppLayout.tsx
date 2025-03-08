import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { ActivePage } from "../types/types";

const ArrowToScrollUp = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        cursor: "pointer",
        background: "white",
        borderRadius: "50%",
        padding: "10px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
};

const AppLayout = ({
  children,
  setActivePage,
  resetQuery,
  activePage,
}: {
  children: React.ReactNode;
  setActivePage: React.Dispatch<React.SetStateAction<ActivePage>>;
  resetQuery: () => void;
  activePage: ActivePage;
}) => {
  const [isArrowSvgVisible, setIsArrowSvgVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsArrowSvgVisible(true);
      } else {
        setIsArrowSvgVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        resetQuery={resetQuery}
      />
      <h1 className="title">Assignment</h1>
      <main style={{ position: "relative" }}>
        {children}
        {isArrowSvgVisible && <ArrowToScrollUp />}
      </main>
    </>
  );
};

export default AppLayout;
