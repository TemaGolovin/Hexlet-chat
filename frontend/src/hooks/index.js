import { useContext } from "react";

import { AuthContext } from "../context/index.js";

export const useAuth = () => useContext(AuthContext);
