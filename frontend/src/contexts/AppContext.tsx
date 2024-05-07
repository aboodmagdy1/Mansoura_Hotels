import React, { useContext, useState } from "react";
import Message from "../components/Message";

type Message = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

//object
type AppContext = {
  // not state but the context here share function with the app components
  showMessage: (message: Message) => void; //مش محدد اي الأكشن بالظبط هحدده ف ال provider
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
  const [alertMessage, setAlertMessage] = useState<Message | undefined>(
    undefined
  );

  return (
    <AppContext.Provider
      //the context is object with some functions on it (so he provide functions )
      value={{
        showMessage: (message) => {
          setAlertMessage(message);
        },
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
