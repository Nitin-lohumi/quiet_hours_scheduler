"use client";
import React from "react";
import { ToastContainer } from "react-toastify";

function ToastWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer draggable autoClose={1500} />
    </>
  );
}

export default ToastWrapper;
