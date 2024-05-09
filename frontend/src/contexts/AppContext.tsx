import React, { useContext, useState } from "react";
import Message from "../components/Message";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type Message = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

//object
type AppContext = {
  // not state but the context here share function with the app components
  showMessage: (message: Message) => void; //مش محدد اي الأكشن بالظبط هحدده ف ال provider
  isLoggedIn: boolean;
};
const AppContext = React.createContext<AppContext | undefined>(undefined);

//custome hook to return the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};

// make the provider comoponent
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode; //the type of children
}) => {
  //state of the alert message
  const [alertMessage, setAlertMessage] = useState<Message | undefined>(
    undefined
  );
  //
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      //the context is object with some functions on it (so he provide functions )
      value={{
        showMessage: (message) => {
          setAlertMessage(message);
        },
        isLoggedIn: !isError,
      }}
    >
      {alertMessage && (
        <Message
          message={alertMessage.message}
          type={alertMessage.type}
          onClose={() => setAlertMessage(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};
