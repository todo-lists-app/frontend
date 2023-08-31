import React, {FC, useEffect, useState} from "react";
import {Col, Row, Container} from "react-bootstrap";
import {Box, Heading, Avatar, Text, Tabs, Button} from "dracula-ui";
import {TodoList} from "../../lib/todo";
import {useAuth} from "react-oidc-context";
import {isFeatureImplemented} from "../../app.config";
import styles from "./profile.module.css"
import {useStorePersist} from "../../lib/storage";
import {base64ToArrayBuffer, base64ToUint8Array, decryptData, getEncryptedData} from "../../lib/cryption";
import {convertJsonToTodoTxt} from "../../lib/exports/todotxt";
import * as fs from "fs";

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
  const [exportTodoTxt, setExportTodoTxt] = useState(false);
  const [doExportTodoTxt, setDoExportTodoTxt] = useState(false);

  const auth = useAuth();
  const avatarName = auth?.user?.profile?.preferred_username || "Unknown Name";
  const profileEmail = auth?.user?.profile?.email || "unknown@email";
  const accessToken = auth.user?.access_token || "";

  const [todos, setTodos] = useState<TodoList>({items: []});
  const {UserSubject, Salt} = useStorePersist();

  useEffect(() => {
    if (doExportTodoTxt) {
      getEncryptedData(accessToken, UserSubject, "list")
        .then((data) => {
          decryptData(UserSubject, Salt, base64ToArrayBuffer(data.data), base64ToUint8Array(data.iv))
            .then((decryptedData) => {
              let todoTxt: string = "";
              for (let i = 0; i < decryptedData.items.length; i++) {
                todoTxt += convertJsonToTodoTxt(decryptedData.items[i]) + "\n";
              }
              const now = new Date();

              const year = now.getFullYear();
              const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
              const day = String(now.getDate()).padStart(2, '0');
              const hours = String(now.getHours()).padStart(2, '0');
              const minutes = String(now.getMinutes()).padStart(2, '0');

              const formattedDate = `${year}-${month}-${day}_${hours}-${minutes}`;
              const download = new Blob([todoTxt], {type: 'text/plain'});
              const url = window.URL.createObjectURL(download);
              const a = document.createElement('a');
              a.href = url;
              a.download = "todo_" + formattedDate + ".txt";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            })
            .catch(err => {
              if (err instanceof DOMException) {
                if (err.message.includes('operation-specific reason')) {
                  console.error("data failed to decrypt")
                  setDoExportTodoTxt(false)
                  setExportTodoTxt(false)
                }
              } else {
                console.error("decrypt error", err)
                setDoExportTodoTxt(false)
                setExportTodoTxt(false)
              }
            })
        })
        .catch(err => {
          console.error("fetch list error", err)
          setDoExportTodoTxt(false)
          setExportTodoTxt(false)
        })
    }
  }, [Salt, UserSubject, accessToken, setTodos, doExportTodoTxt])

  return (
    <>
      {confirmOpen && (
        <Box className={styles.confirmBox}>
          <Heading>Are you sure?</Heading>
          <Text>{confirmText}</Text>
          <Box className={styles.confirmButtons}>
            <Button color={"green"} onClick={() => {
              setConfirmOpen(false)
              if (exportTodoTxt) {
                setDoExportTodoTxt(true)
              }
            }}>Confirm</Button>
            <Button color={"red"} onClick={() => {
              setConfirmOpen(false)
              setExportTodoTxt(false)
              setExportTodoTxt(false)
            }}>Cancel</Button>
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
                            setExportTodoTxt(true)
                            setTimeout(() => {
                              setConfirmOpen(false)
                              setExportTodoTxt(false)
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
