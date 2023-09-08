import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

function App() {
  // hooks -------------------------------------
  const [devices, setDevices] = useState([]);   // devices decected 
  const manager = new BleManager();     // utility obj for bluetooth

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        scanDevices();
      }
    }, true);

    return () => {
      subscription.remove();
    };
  }, []);

  // handlers ------------------------------------
  const scanDevices = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }

      // put read data into state
      setDevices((prevDevices) => {
        if (!prevDevices.some((d) => d.id === device.id)) {
          return [...prevDevices, device];
        }
        return prevDevices;
      });
    });

    // Stop scanning after 10 seconds
    setTimeout(() => {
      manager.stopDeviceScan();
    }, 10000);
  };

  // jsx -------------------------------------------
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Scan Bluetooth Devices" onPress={scanDevices} />

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>Name: {item.name || 'N/A'}</Text>
            <Text>RSSI: {item.rssi || 'N/A'}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default App;


