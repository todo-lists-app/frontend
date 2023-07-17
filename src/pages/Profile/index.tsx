import React, {FC, useEffect, useState} from "react";
import {Box, Card, Heading} from "dracula-ui";
import {TodoItem, TodoList} from "../../lib/todo";
import {useAuth} from "react-oidc-context";
import {
  arrayBufferToBase64,
  base64ToArrayBuffer,
  base64ToUint8Array, decryptData,
  encryptData,
  uint8ArrayToBase64
} from "../../lib/cryption";
import {appConfig} from "../../app.config";

export const Profile: FC = () => {
  const auth = useAuth();

  console.log("profile", auth?.user?.profile)

  return (
    <>
      <Box>
        <Heading>Profile</Heading>
        <Box p={"sm"} borderColor={"purple"}>
          <p>Username: {auth?.user?.profile?.preferred_username}</p>
          <p>First name: {auth?.user?.profile?.given_name}</p>
          <p>Last name: {auth?.user?.profile?.family_name}</p>
          <p>Email: {auth?.user?.profile?.email}</p>
        </Box>
      </Box>
    </>
  );
}
