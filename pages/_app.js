import { ChakraProvider } from "@chakra-ui/react";
import { createContext, useState } from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(0);
  const data = {
    userid: {
      value: user,
      change: setUser,
    },
  };
  console.log(user);
  return (
    <userContext.Provider value={data}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </userContext.Provider>
  );
}

export const userContext = createContext(null);

export default MyApp;
