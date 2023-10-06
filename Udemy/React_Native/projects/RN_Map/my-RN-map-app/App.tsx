import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Svg, { Circle } from "react-native-svg";

const tokyoRegion = {
  latitude: 35.6762,
  longitude: 139.6503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function App() {
  //create a Hook to store our region data.
  const [region, setRegion] = useState(tokyoRegion);
  const [isMarkerPressed, setMarkerPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const handleButtonPress = () => {
    alert("Button Pressed!");
  };

  const handleMarkerPress = () => {
    setModalVisible(true);
    setMarkerPressed(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setMarkerPressed(false);
  };

  return (
    <View style={styles.container}>
      {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={tokyoRegion}
        //onRegionChangeComplete runs when the user stops dragging MapView
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
        <Marker coordinate={tokyoRegion} onPress={handleMarkerPress}>
          <Image
            source={require("./assets/MapMarker.png")}
            style={
              isMarkerPressed
                ? { height: 60, width: 60 }
                : { height: 50, width: 50 }
            }
            resizeMode="cover"
          />
        </Marker>
        {/*marker to a nearby location */}
        {/* <Marker
          coordinate={{
            latitude: 35.67714827145542,
            longitude: 139.6551462687416,
          }}
          pinColor="blue"
        /> */}

        <Marker
          coordinate={{
            latitude: 35.67714827145542,
            longitude: 139.6551462687416,
          }}
          onPress={handleMarkerPress}
        >
          <Svg height="50" width="50">
            <Circle
              cx="25"
              cy="25"
              r="20"
              fill={isMarkerPressed ? "blue" : "red"}
            />
          </Svg>
        </Marker>
      </MapView>

      {/*Display user's current region:*/}
      {/* {region && (
        <Text style={styles.text}>Current latitude: {region.latitude}</Text>
      )}
      {region && (
        <Text style={styles.text}>Current longitude: {region.longitude}</Text>
      )} */}

      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ height: 200, backgroundColor: "white", padding: 20 }}>
            <Text>Marker Info</Text>

            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={{ backgroundColor: "#00bbff" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //! the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    backgroundColor: "#00fff2",
  },
  button: {
    position: "absolute",
    top: 150,
    right: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});
