import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { Connection as ConnectionClass, startConnection } from '../../Hid';

const useDeviceConnection = () => {

  const [deviceConnected, setDeviceConnected] = useState();
  const [ConnectionInstance] = useState(new ConnectionClass());

  useEffect(() => {
    ConnectionInstance.onConnectFunc = () => {
      setDeviceConnected(true);
    };

    ConnectionInstance.onDisconnectFunc = () => {
      setDeviceConnected(false);
    };

    startConnection(ConnectionInstance);
  }, [ConnectionInstance]);

  return {
    deviceConnected,
    ConnectionInstance
  }
}

export default createContainer(useDeviceConnection);
