"use client";
import {
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from "@prisma/client";
import React, { FC, useEffect, useMemo, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronsUpDown, Compass, Menu, PlusCircleIcon } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import Link from "next/link";

type props = {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
};

const MenuOptions: FC<props> = ({
  details,
  id,
  sidebarLogo,
  sidebarOpt,
  subAccounts,
  user,
  defaultOpen,
}) => {
  const [ismounted, setIsMounted] = useState(false);

  const openState = useMemo(
    () => (!defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!ismounted) return;
  return (
    <Sheet
      modal={false}
      // {...openState}
      open={true}
    >
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:hidden flex"
      >
        <Button variant={"outline"} size={"icon"}>
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={cn(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <div>
          <AspectRatio ratio={16 / 5}>
            <Image
              src={sidebarLogo}
              alt="Sidebar logo"
              fill
              className="rounded-md object-contain"
            />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className="w-full my-4 flex items-center justify-between py-8"
              >
                <div className="flex items-center text-left gap-2">
                  <Compass />
                  <div className="flex flex-col">
                    {details.name}
                    <span className="text-muted-foreground">
                      {details.address}
                    </span>
                  </div>
                </div>
                <div>
                  <ChevronsUpDown size={16} className="text-muted-foreground" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-80 mt-4 z-[200]">
              {
                <Command className="rounded-lg">
                  <CommandInput placeholder="Search Accounts.." />
                  <CommandList className="pb-16">
                    <CommandEmpty>No Results found</CommandEmpty>
                    {(user?.role === "AGENCY_OWNER" ||
                      user?.role === "AGENCY_ADMIN") &&
                      user?.Agency && (
                        <CommandGroup heading="Agency">
                          <CommandItem className="!bg-transparent my-2 text-primary border-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                            {defaultOpen ? (
                              <Link
                                href={`/agency/${user?.Agency?.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={user?.Agency?.agencyLogo}
                                    alt="agency-logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                  <div className="flex flex-col flex-1">
                                    {user?.Agency?.name}
                                    <span className="text-muted-foreground">
                                      {user?.Agency?.address}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={`/agency/${user?.Agency?.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    <Image
                                      src={user?.Agency?.agencyLogo}
                                      alt="agency-logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                    <div className="flex flex-col flex-1">
                                      {user?.Agency?.name}
                                      <span className="text-muted-foreground">
                                        {user?.Agency?.address}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </SheetClose>
                            )}
                          </CommandItem>
                        </CommandGroup>
                      )}
                    <CommandGroup heading="Accounts">
                      {!!subAccounts
                        ? subAccounts.map((subAcc) => (
                            <CommandItem key={subAcc.id}>
                              {defaultOpen ? (
                                <Link
                                  href={`/subaccount/${subAcc.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    <Image
                                      src={subAcc.subAccountLogo}
                                      alt="agency-logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                    <div className="flex flex-col flex-1">
                                      {subAcc.name}
                                      <span className="text-muted-foreground">
                                        {subAcc.address}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              ) : (
                                <SheetClose asChild>
                                  <Link
                                    href={`/subaccount/${subAcc.id}`}
                                    className="flex gap-4 w-full h-full"
                                  >
                                    <div className="relative w-16">
                                      <Image
                                        src={subAcc.subAccountLogo}
                                        alt="subaccount-logo"
                                        fill
                                        className="rounded-md object-contain"
                                      />
                                      <div className="flex flex-col flex-1">
                                        {subAcc.name}
                                        <span className="text-muted-foreground">
                                          {subAcc.address}
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </SheetClose>
                              )}
                            </CommandItem>
                          ))
                        : "No Accounts"}
                    </CommandGroup>
                  </CommandList>
                  {(user?.role === "AGENCY_OWNER" ||
                    user?.role === "AGENCY_ADMIN") && (
                    <Button className="w-full flex gap-2">
                      <PlusCircleIcon size={25} />
                      Create Sub Account
                    </Button>
                  )}
                </Command>
              }
            </PopoverContent>
          </Popover>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
