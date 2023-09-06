import { StyleSheet, View, Alert, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { getMapPreview } from "../../util/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();   // use to generate Google Static Map Image
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused(); // boolean

  // user picked location from Map.js screen ------------------------------
  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        // user picked location in Map.js
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);
  // ---------------------------------------------------------------------

  async function verifyPermission() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission(); //! asking for user's permission
      return permissionResponse.granted; // true if granted, false otherwise
    }
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app"
      );
      return false;
    }
    return true; // do have permission
  }

  async function getLocationHandler() {
    // permissions
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    // fetch location
    const location = await getCurrentPositionAsync();
    console.log(location);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No locaiton picked yet!</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "sapce-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
