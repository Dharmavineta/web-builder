import Sidebar from "@/components/sidebar";
import Unauthorised from "@/components/unauthorised";
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { FC } from "react";

type props = {
  children: React.ReactNode;
  params: { agencyId: string };
};

const layout: FC<props> = async ({ children, params }) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }
  if (!agencyId) {
    return "/agency";
  }

  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  ) {
    return <Unauthorised />;
  }

  let allNotif: any = [];

  const notifications = await getNotificationAndUser(agencyId);

  if (notifications) allNotif = notifications;

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={agencyId} type="agency" />
      <div className="md:pl-[300px]">{children}</div>
    </div>
  );
};

export default layout;
