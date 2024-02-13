import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { dark } from "@clerk/themes";

type props = {
  children: React.ReactNode;
};

const layout = ({ children }: props) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>{children}</ClerkProvider>
  );
};

export default layout;
