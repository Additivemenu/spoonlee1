import { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.78,
    longitude: -1222.43,
    latitudeDelta: 0.0922, // define zoom of map
    longitudeDelta: 0.0421,
  };

  function selectionLocationHandler(event) {
    // MapView onPress's callback
    console.log(event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location pick!", "You have to pick a location first");
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    }); // screen communication
  }, [navigation, selectedLocation]);   // only re-create savePickedLocationHandler when any dependencies change

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);  // if any of navigation, savePickedLocationHandler changes, re-run callback

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectionLocationHandler}
    >
      {/* only render marker if selected a location */}
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1, // take up all available space
  },
});
