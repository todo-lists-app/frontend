import React, {FC} from "react";
import {Avatar,Box} from "dracula-ui";
import {useAuth} from "react-oidc-context";
import gravatarUrl from "gravatar-url";

export const AccountMenu: FC = () => {
  const auth = useAuth();
  const given_name = auth?.user?.profile.given_name || "";
  let picture = auth?.user?.profile.picture || "";
  if (picture === "") {
    const email = auth?.user?.profile.email || "";
    if (email !== "") {
      picture = gravatarUrl(email, {size: 200});
    }
  }

  console.log("profile", auth.user)

  return (
    <Box>
      <Avatar title={given_name} src={picture} />
    </Box>
  )
}
