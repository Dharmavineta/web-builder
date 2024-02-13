import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../global/mode-toggle";

type props = {
  user?: null | User;
};

const Navigation = ({ user }: props) => {
  return (
    <div className="p-4 bg-white dark:bg-slate-800 flex items-center justify-between fixed top-0 right-0 left-0 z-10">
      <aside className="flex items-center gap-2">
        <Image
          src={"/assets/plura-logo.svg"}
          width={40}
          height={40}
          alt="logo image"
        />
        <span className="text-xl font-bold">Plura.</span>
      </aside>
      <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"/"}>Pricing</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Documentation</Link>
          <Link href={"/"}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={"/agency"}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80 "
        >
          Login
        </Link>
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
