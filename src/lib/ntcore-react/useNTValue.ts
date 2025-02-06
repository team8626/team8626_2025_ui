// https://github.com/CrispyBacon1999/ntcore-react/tree/main/src/lib
// The packaged version of this was buggy so I tossed it in here

import { NetworkTablesTypeInfo } from "ntcore-ts-client";
import { useContext, useEffect, useState } from "react";
import NTContext from "./NTContext";
import NTTopicTypes from "./NTTopicTypes";

const useNTValue = <T extends NTTopicTypes>(
    key: string,
    ntType: NetworkTablesTypeInfo,
    defaultValue: T
) => {
    const client = useContext(NTContext);
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        if (client) {
            const listener = (value: T | null) => {
                setValue(value ?? defaultValue);
            };
            const clientTopic = client.createTopic(key, ntType, defaultValue);
            const subscriptionUID = clientTopic.subscribe(listener);

            return () => {
                if (subscriptionUID && clientTopic) {
                    clientTopic.unsubscribe(subscriptionUID);
                }
            };
        } else {
            throw new Error(
                "No NTProvider found. Please wrap your application in an NTProvider"
            );
        }
    }, [key, client]);

    return value;
};

export default useNTValue;