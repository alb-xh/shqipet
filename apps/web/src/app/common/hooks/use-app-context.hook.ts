import { useContext } from "react";

import { appContext } from "../app.context";

export const useAppContext = () => useContext(appContext);