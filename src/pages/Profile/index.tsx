import React, {FC, useEffect, useState} from "react";
import {Col, Row, Container, Nav} from "react-bootstrap";
import {Box, Heading, Avatar, Text, Tabs, Button} from "dracula-ui";
import {TodoItem, TodoList} from "../../lib/todo";
import {useAuth} from "react-oidc-context";
import {
  arrayBufferToBase64,
  base64ToArrayBuffer,
  base64ToUint8Array, decryptData,
  encryptData, getEncryptedData,
  uint8ArrayToBase64
} from "../../lib/cryption";
import {appConfig, isFeatureImplemented} from "../../app.config";
import styles from "./profile.module.css"
import {useStorePersist} from "../../lib/storage";

export const Profile: FC = () => {
  let tabDefault: "activity" | "settings" = "activity";
  if (isFeatureImplemented({featureSet: "profile", featureName: "activity"})) {
    tabDefault = "activity";
  }
  if (isFeatureImplemented({featureSet: "profile", featureName: "settings"})) {
    tabDefault = "settings";
  }
  const [activeTab, setActiveTab] = useState(tabDefault);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const auth = useAuth();
  const avatarName = auth?.user?.profile?.preferred_username || "Unknown Name";
  const profileEmail = auth?.user?.profile?.email || "unknown@email";

  const [todos, setTodos] = useState<TodoList>({items: []});
  const {UserSubject, setUserSubject, Salt, setSalt} = useStorePersist();
  // useEffect(() => {
  //   setUserSubject(auth?.user?.profile.sub || "");
  //   let accessToken = auth.user?.access_token || "";
  //   getEncryptedData(accessToken, UserSubject, Salt, setTodos, setSalt);
  // }, [auth, Salt, UserSubject, setSalt, setUserSubject]);

  return (
    <>
      {confirmOpen && (
        <Box className={styles.confirmBox}>
          <Heading>Are you sure?</Heading>
          <Text>{confirmText}</Text>
          <Box className={styles.confirmButtons}>
            <Button color={"green"} onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button color={"red"} onClick={() => setConfirmOpen(false)}>Confirm</Button>
          </Box>
        </Box>
      )}
      <Container>
        <Row>
          <Col md={12} lg={12} xl={4}>
            <Row>
              <Col md={12} lg={12} xl={12}>
                <Box className={styles.profileCard}>
                  <Box className={styles.profileInformation}>
                    <Avatar src={auth?.user?.profile?.picture} title={avatarName} className={`drac-avatar drac-bg-green-transparent drac-text-green ${styles.profileAvatar}`} />
                    <Box className={styles.profileData}>
                      <Text className={styles.profileName}>{avatarName}</Text><br />
                      <Text className={styles.profileContact}>{profileEmail}</Text><br />
                    </Box>
                  </Box>
                  <Box className={styles.profileStats}>
                    {isFeatureImplemented({featureSet: "profile", featureName: "todos"}) && (
                      <Box className={styles.profileStat}>
                        <Text className={styles.profileStatNumber}>05</Text>
                        <Text className={styles.profileStatTitle}>Projects</Text>
                      </Box>
                    )}
                    {isFeatureImplemented({featureSet: "profile", featureName: "tasks"}) && (
                      <Box className={styles.profileStat}>
                        <Text className={styles.profileStatNumber}>24</Text>
                        <Text className={styles.profileStatTitle}>Tasks</Text>
                      </Box>
                    )}
                    {isFeatureImplemented({featureSet: "profile", featureName: "reports"}) && (
                      <Box className={styles.profileStat}>
                        <Text className={styles.profileStatNumber}>12</Text>
                        <Text className={styles.profileStatTitle}>Reports</Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Col>
            </Row>
          </Col>
          <Col md={12} lg={12} xl={8}>
            <Box className={styles.tabBox}>
              <Tabs color={"purple"}>
                {isFeatureImplemented({featureSet: "profile", featureName: "activity"}) && (
                  <li className={`drac-tab ${activeTab === 'activity' ? 'drac-tab-active' : ''}`}>
                    <span className={`drac-tab-link ${styles.profileTabLink}`} onClick={() => setActiveTab('activity')}>
                      Activity
                    </span>
                  </li>
                )}
                {isFeatureImplemented({featureSet: "profile", featureName: "settings"}) && (
                  <li className={`drac-tab ${activeTab === 'settings' ? 'drac-tab-active' : ''}`}>
                    <span className={`drac-tab-link ${styles.profileTabLink}`} onClick={() => setActiveTab('settings')}>
                      Settings
                    </span>
                  </li>
                )}
              </Tabs>
              <Box className={styles.profileContent}>
                {activeTab === "activity" && (
                  <Box className={styles.profileContentBox}>
                    <Box className={styles.profileContentBoxHeader}>
                      <Heading className={styles.profileContentBoxHeaderTitle}>Activity</Heading>
                      {/* Other content for the activity tab goes here */}
                    </Box>
                  </Box>
                )}
                {activeTab === "settings" && (
                  <Box className={styles.profileContentBox}>
                    <Box className={styles.profileContentBoxHeader}>
                      <Heading className={styles.profileContentBoxHeaderTitle}>Settings</Heading>

                      {isFeatureImplemented({featureSet: "account", featureName: "delete"}) && (
                        <Box p={"md"}>
                          <Button color={"red"} onClick={() => {
                            setConfirmOpen(true);
                            setConfirmText("Are you sure you want to delete your account? This action cannot be undone.")
                            setTimeout(() => {
                              setConfirmOpen(false);
                            }, 5000);
                          }}>Delete Account</Button>
                        </Box>
                      )}
                      {isFeatureImplemented({featureSet: "export", featureName: "todotxt"}) && (
                        <Box p={"md"}>
                          <Button color={"purple"} onClick={() => {
                            setConfirmOpen(true);
                            setConfirmText("Are you sure you want to export your data?");
                            setTimeout(() => {
                              setConfirmOpen(false);
                            }, 5000);
                          }}>Export Data in todo.txt format</Button>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Col>
        </Row>
      </Container>
    </>
  );
}
