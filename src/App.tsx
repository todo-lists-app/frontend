import React, {FC} from "react";
import {useAuth} from "react-oidc-context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'dracula-ui/styles/dracula-ui.css';

import {Layout} from "./components/Layout";
import {Home} from "./pages/Home";
import {TodoPage} from "./pages/Todo";
import {Privacy} from "./pages/Policy/Privacy";
import {Security} from "./pages/Policy/Security";
import {Terms} from "./pages/Policy/Terms";
import {Apps} from "./pages/Apps";
import {About} from "./pages/Company/About";
import {Contact} from "./pages/Company/Contact";
import {Careers} from "./pages/Company/Careers";
import {Profile} from "./pages/Profile";
import {TaskPage} from "./pages/Task";
import usePushNotifications from "./hooks/pushNotifications";
import ServicePing from "./components/ServicePing";

const App: FC = () => {
  const auth = useAuth();
  const given_name = auth?.user?.profile.given_name;
  const subject = auth?.user?.profile.sub || ''
  usePushNotifications(subject)

  return (
    <BrowserRouter>
      <ServicePing />
      <Layout>
        <Routes>
          {given_name ? (
            <>
              <Route path="/" element={<TodoPage />} />
            </>
            ): (
            <>
              <Route path="/" element={<Home />} />
            </>
          )}
          <Route path="/company/about" element={<About />} />
          <Route path="/company/contact" element={<Contact />} />
          <Route path="/company/careers" element={<Careers />} />
          <Route path="/policy/privacy" element={<Privacy />} />
          <Route path="/policy/security" element={<Security />} />
          <Route path="/policy/terms" element={<Terms />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/task" element={<TaskPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
