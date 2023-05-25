import React, { FC } from "react";
import {useAuth} from "react-oidc-context";

import {
  encryptData,
  decryptData,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  uint8ArrayToBase64,
  base64ToUint8Array
} from "../../Cryption";
import {appConfig} from "../../app.config";

export const TodoPage: FC = () => {
  const auth = useAuth();

  if (auth?.user?.profile) {
    let subject = auth?.user?.profile.email || "";
    let salt = auth?.user?.profile.sub || "";

    if (subject !== undefined && subject !== "") {
      fetch(appConfig.apiURL + `/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Subject': subject,
        }
      }).then(res => res.json())
        .then(data => console.log("return data", data))
        .catch(err => console.log("error", err))

      encryptData(subject, salt,
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      ).then((data) => {
        fetch(appConfig.apiURL + `/list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Subject': subject,
          },
          body: JSON.stringify({
            data: arrayBufferToBase64(data.data),
            iv: uint8ArrayToBase64(data.iv),
          })
        }).then(res => res.json())
          .then(ret => {
            let data = base64ToArrayBuffer(ret.data);
            let iv = base64ToUint8Array(ret.iv);

            decryptData(subject, salt, data, iv).then((data) => {
              console.log("decrypted", data);
            })

            console.log("return create data", data)
          })
          .catch(err => console.log("error", err))
      });
    }
  }

  return (
    <div>
      <h1>Todo!</h1>
    </div>
  );
}
