import { NetworkTablesTopic, type NetworkTablesTypeInfo } from 'ntcore-ts-client'
import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import NTContext from './NTContext'
import NTTopicTypes from './NTTopicTypes'

const useNTState = <T extends NTTopicTypes>(
  key: string,
  ntType: NetworkTablesTypeInfo,
  defaultValue: T
): [
  T,
  (
    value: T,
    publishProperties?: {
      persistent?: boolean
      retained?: boolean
      id?: number
    }
  ) => void,
] => {
  const client = useContext(NTContext)
  const [topic, setTopic] = useState<NetworkTablesTopic<T> | null>(null)
  const [value, setValue] = useState<T>(defaultValue)
  const [id] = useState<string>(uuidv4())

  useEffect(() => {
    if (client) {
      const listener = (value: T | null) => {
        setValue(value ?? defaultValue)
      }
      const clientTopic = client.createTopic(key, ntType, defaultValue)
      const subscriptionUID = clientTopic.subscribe(listener)
      setTopic(clientTopic)

      return () => {
        if (subscriptionUID && clientTopic) {
          clientTopic.unsubscribe(subscriptionUID)
        }
      }
    } else {
      throw new Error('No NTProvider found. Please wrap your application in an NTProvider')
    }
  }, [key, client])

  /**
   * Set the value of the topic
   *
   * Will likely throw an error if multiple apps try to set the value at the same time
   * @param value Value to set
   * @param publishProperties Properties to pass to the publish method
   */
  const setNTValue = async (
    value: T,
    publishProperties?: {
      persistent?: boolean
      retained?: boolean
    }
  ) => {
    if (topic) {
      topic.announce({
        type: 'string',
        name: key,
        // eslint-disable-next-line
        // @ts-ignore
        id,
        properties: {},
        // eslint-disable-next-line
        // @ts-ignore
        pubuid: id,
      })

      await topic.publish(publishProperties)
      topic.setValue(value)
      setValue(value)
    }
  }

  return [value, setNTValue]
}

export default useNTState
