// https://github.com/CrispyBacon1999/ntcore-react/tree/main/src/lib
// The packaged version of this was buggy so I tossed it in here

import { useContext, useEffect, useState } from "react";
import NTContext from "./NTContext";

const useNTConnected = () => {
    const client = useContext(NTContext);
    const [connected, setConnected] = useState(false);
    useEffect(() => {
        if (client) {
            const cleanup = client.addRobotConnectionListener((connected) => {
                setConnected(connected);
            });
            return () => {
                if (cleanup) {
                    cleanup();
                }
            };
        }
    }, [client]);

    return connected;
};

export default useNTConnected;