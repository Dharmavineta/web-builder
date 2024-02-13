import Navigation from "@/components/site/Navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React, { FC } from "react";

type props = {
  children: React.ReactNode;
};

const layout: FC<props> = ({ children }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      {" "}
      <div className="h-full">
        <Navigation />
        {children}
      </div>
    </ClerkProvider>
  );
};

export default layout;
