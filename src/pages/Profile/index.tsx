import React, {FC, useEffect, useState} from "react";
import {Box} from "dracula-ui";
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
    <div>
      <h1>Profile!</h1>
    </div>
  );
}
