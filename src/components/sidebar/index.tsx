import { getAuthuser } from "@/lib/queries";
import React from "react";
import MenuOptions from "./MenuOptions";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: Props) => {
  const user = await getAuthuser();

  if (!user) return null;

  if (!user.Agency) return;

  const details =
    type === "agency"
      ? user?.Agency
      : user?.Agency.SubAccount.find((subAcc) => subAcc.id === id);

  const isWhiteLabelledAgency = user.Agency.whiteLabel;

  if (!details) return;

  let sideBarLogo = user.Agency.agencyLogo || "/assets/plura-logo.svg";

  if (!isWhiteLabelledAgency) {
    if (type === "subaccount") {
      sideBarLogo =
        user.Agency.SubAccount.find((subAcc) => subAcc.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sideBarOptions =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((subAcc) => subAcc.id === id)
          ?.SidebarOption || [];

  const subAccounts = user.Agency.SubAccount.filter((subAcc) =>
    user.Permissions.find(
      (permission) => permission.subAccountId === subAcc.id && permission.access
    )
  );
  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sideBarOptions}
        subAccounts={subAccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sideBarOptions}
        subAccounts={subAccounts}
        user={user}
      />
    </>
  );
};

export default Sidebar;
