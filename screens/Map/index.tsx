import React, { useEffect } from "react";
import {
  Platform,
  View,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import MapView, {
  Heatmap,
  Marker,
  Polygon,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import mockData from "./data.json";
import * as turf from "@turf/turf";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Map: React.FC = () => {
  const [heatPoints, setHeatPoints] = React.useState<any>([]);
  const [center, setCenter] = React.useState<any>([]);
  const [latLong, setLatLong] = React.useState<any>([]);
  const [voronoiPolygons, setVoronoiPolygons] = React.useState<any>([]);
  const [visible, setVisible] = React.useState<boolean>(false);

  // Get all points from the mock data
  useEffect(() => {
    const points = mockData
      .map((item: any) => {
        const { latitude, longitude } = item.enderecoDestino;
        if (!latitude || !longitude) return null;
        return {
          latitude: latitude,
          longitude: longitude,
          weight: 5,
        };
      })
      .filter(Boolean);
    setHeatPoints(points);
  }, [mockData]);

  //Calculates the center of the points
  useEffect(() => {
    const points: any = mockData
      .map((item: any) => {
        const { latitude, longitude } = item.enderecoDestino;
        if (!latitude || !longitude) return null;
        return [longitude, latitude];
      })
      .filter(Boolean);

    setLatLong(points);
    const center = turf.center(turf.points(points));
    setCenter(center.geometry.coordinates);
  }, []);

  useEffect(() => {
    if (latLong.length) {
      const options: any = {
        bbox: [-74, -33.75, -34.79, 5.28],
      };
      const voronoi = turf.voronoi(turf.points(latLong), options);
      setVoronoiPolygons(voronoi);
    }
  }, [latLong, mockData]);

  //Display loading indicator while map is loading
  if (!center.length)
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={Colors.mainPurple} />
      </View>
    );

  const getColorOfPolygon = (polygonArea: number) => {
    if (polygonArea < 100) return "rgba(255, 0, 0, 0.2)";
    if (polygonArea < 1000) return "rgba(255, 255, 0, 0.2)";
    if (polygonArea < 10000) return "rgba(0, 255, 0, 0.3)";
    if (polygonArea < 100000) return "rgba(0, 255, 255, 0.2)";
    return "rgba(255, 255, 255, 0.3)";
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Pressable
        onPress={() => setVisible(!visible)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1,
          backgroundColor: Colors.mainPurple,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Ionicons
          name={visible ? "eye-outline" : "eye-off-outline"}
          size={24}
          color="white"
        />
      </Pressable>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: center[1],
          longitude: center[0],
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
      >
        {
          //Display Voronoi Polygons
          visible &&
            voronoiPolygons?.features?.map((item: any, index: number) => {
              const coordinates = item.geometry.coordinates[0];
              const coordinatesFixed = coordinates.map((item: any) => {
                return {
                  latitude: item[1],
                  longitude: item[0],
                };
              });
              const totalAreaOfPolygon = Number(
                (turf.area(item) / 1000000).toFixed(2)
              );

              return (
                <>
                  <Polygon
                    key={`${index}-polygon`}
                    coordinates={coordinatesFixed}
                    strokeColor="#000"
                    fillColor={getColorOfPolygon(totalAreaOfPolygon)}
                    strokeWidth={2}
                  />
                  <Marker
                    key={`${index}-marker`}
                    coordinate={{
                      latitude: latLong[index][1],
                      longitude: latLong[index][0],
                    }}
                  />
                </>
              );
            })
        }

        {!visible && (
          <Heatmap
            points={heatPoints}
            opacity={0.5}
            radius={Platform.OS === "ios" ? 200 : 50}
            gradient={{
              colors: ["#0000ff", "#00ffff", "#00ff00", "#ffff00", "#ff0000"],
              startPoints: [0.01, 0.25, 0.5, 0.75, 1],
              colorMapSize: 256,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Map;
