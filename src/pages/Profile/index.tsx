import React, {FC, useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import {Box, Card, Heading, Avatar, Text} from "dracula-ui";
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
import styles from "./profile.module.css"

export const Profile: FC = () => {
  const auth = useAuth();
  const avatarName = auth?.user?.profile?.preferred_username || "Unknown Name";
  const profileEmail = auth?.user?.profile?.email || "unknown@email";

  return (
    <>
      <Box>
        <Col md={12} lg={12} xl={12}>
          <Box className={styles.profileCard}>
            <Box className={styles.profileBox}>
              <Box className={styles.profileInformation}>
                <Avatar src={auth?.user?.profile?.picture} title={avatarName} />
                <Box className={styles.profileData}>
                  <Text className={styles.profileName}>{avatarName}</Text>
                  <Text className={styles.profileContact}>{profileEmail}</Text>
                </Box>
              </Box>
              {/*<ProfileStats>*/}
              {/*  <ProfileStat>*/}
              {/*    <ProfileStatNumber>05</ProfileStatNumber>*/}
              {/*    <ProfileStatTitle>Projects</ProfileStatTitle>*/}
              {/*  </ProfileStat>*/}
              {/*  <ProfileStat>*/}
              {/*    <ProfileStatNumber>24</ProfileStatNumber>*/}
              {/*    <ProfileStatTitle>Tasks</ProfileStatTitle>*/}
              {/*  </ProfileStat>*/}
              {/*  <ProfileStat>*/}
              {/*    <ProfileStatNumber>12</ProfileStatNumber>*/}
              {/*    <ProfileStatTitle>Reports</ProfileStatTitle>*/}
              {/*  </ProfileStat>*/}
              {/*</ProfileStats>*/}
            </Box>
          </Box>
        </Col>
      </Box>
    </>
  );
}
