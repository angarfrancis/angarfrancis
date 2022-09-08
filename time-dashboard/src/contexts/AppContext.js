import { createContext, useState } from "react";

export const AppContext = createContext();

function ModalContext({ children }) {
    const [modalData, setModalData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    return (
        <AppContext.Provider value={
            {
                modalData,
                setModalData,
                refresh, 
                setRefresh
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export default ModalContext;