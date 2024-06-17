'use client'

// import { useState, useEffect } from "react";
import Toast from "./toast"; // Import the Toast component

const createNotification = (
  message?: string,
  type = "info",
  duration = 3000
) => {

  // useEffect(() => {
  //   setIsVisible(true);
  //   const timeoutId = setTimeout(() => {
  //     setIsVisible(false);
  //   }, duration);

  //   return () => clearTimeout(timeoutId); // Cleanup function
  // }, [message, type, duration]);

  return <Toast message={message} type={type} />;
};

export default createNotification;
