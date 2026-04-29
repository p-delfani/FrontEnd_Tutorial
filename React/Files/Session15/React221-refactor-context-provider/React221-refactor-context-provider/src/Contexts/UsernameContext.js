import { createContext, useState } from "react";

export const UsernameContext = createContext()

const UsernameProvider = ({ children }) => {

  const [username, setUserName] = useState("Mohammad Amin");


    return (
        <UsernameContext.Provider value={username}>
            {children}
        </UsernameContext.Provider>
    )
}

export default UsernameProvider