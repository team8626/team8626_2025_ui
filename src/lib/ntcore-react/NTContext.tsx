// https://github.com/CrispyBacon1999/ntcore-react/tree/main/src/lib
// The packaged version of this was buggy so I tossed it in here

import { createContext } from "react";
import { NetworkTables } from "ntcore-ts-client";

type NTContextType = NetworkTables | null;

const NTContext = createContext<NTContextType>(null);

export default NTContext;