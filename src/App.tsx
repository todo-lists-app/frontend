import React, { FC } from "react";
import {useAuth} from "react-oidc-context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'dracula-ui/styles/dracula-ui.css';

import {Layout} from "./components/Layout";
import {Home} from "./pages/Home";
import {TodoPage} from "./pages/Todo";

const App: FC = () => {
  const auth = useAuth();
  const given_name = auth?.user?.profile.given_name;

  return (
    <BrowserRouter>
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
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
