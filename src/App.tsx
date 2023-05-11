import React, { useContext, useEffect, useState } from "react";
import AppRouter from "../src/routes/AppRouter";
import { Context } from "./index";
import { check } from "./Api/UserApi";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then((data) => {
          user.setUser(data);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, [user]);

  if (loading) {
    return <div>Загрузка</div>;
  }

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
