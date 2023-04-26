
import MainPage from "./main";
import LoginPage from "./login";
import { useState } from "react";

function App() {
  const [ user, setUser ] = useState(null);

  if (!user) {
    const userStr = localStorage.getItem('user');
    const newUser = userStr ? JSON.parse(userStr): null;

    console.log(newUser);

    if (newUser) {
      setUser(newUser)

      return null;
    }

    return <LoginPage />;
  }


  return (
    <MainPage />
  );
}

export default App;


