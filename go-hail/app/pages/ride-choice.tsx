import React, { useRef, useState } from "react";
import { Animated, Dimensions, FlatList, PanResponder, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import AntDesign from "@expo/vector-icons/AntDesign";
import { WebView } from "react-native-webview";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ui/ThemedButton";

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  MapPage: {
    destination: { name: string; coordinates: [number, number] };
    userLocation: [number, number] | null;
  };
};

type MapPageRouteProp = RouteProp<RootStackParamList, "MapPage">;

const rides = [
  { id: "1", name: "UberX", price: "$5", duration: "10 min" },
  { id: "2", name: "UberXL", price: "$8", duration: "12 min" },
  { id: "3", name: "UberBlack", price: "$15", duration: "10 min" },
  { id: "4", name: "Shared", price: "$3", duration: "15 min" },
];


export default function RideChoice() {

  const route = useRoute<MapPageRouteProp>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];
  const { destination, userLocation } = route.params;
  const [pickupCoords, setPickupCoords] = useState(
    userLocation ? [userLocation[0], userLocation[1]] : [-33.9249, 18.4241]
  );

  const [destCoords, setDestCoords] = useState([
    destination.coordinates[1],
    destination.coordinates[0],
  ]);

  // Snap points
  const bottomHeight = height * 0.6; // collapsed
  const middleHeight = height * 0.4; // middle
  const topHeight = height * 0;    // almost full screen

  const [selectedRide, setSelectedRide] = useState(rides[0]);
  const [paymentType, setPaymentType] = useState("Cash"); // default payment

  const handleBack = () => router.back();

  const panY = useRef(new Animated.Value(bottomHeight)).current;
  const panelCurrent = useRef(bottomHeight);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        let newY = gestureState.dy + panelCurrent.current;
        // clamp within topHeight and bottomHeight
        newY = Math.max(topHeight, Math.min(bottomHeight, newY));
        panY.setValue(newY);
      },
      onPanResponderRelease: (_, gestureState) => {
        const current = panelCurrent.current + gestureState.dy;
        // find closest snap point
        const distances = [
          { point: topHeight, diff: Math.abs(current - topHeight) },
          { point: middleHeight, diff: Math.abs(current - middleHeight) },
          { point: bottomHeight, diff: Math.abs(current - bottomHeight) },
        ];
        const target = distances.reduce((prev, curr) => (curr.diff < prev.diff ? curr : prev)).point;

        Animated.spring(panY, { toValue: target, useNativeDriver: false }).start();
        panelCurrent.current = target;
      },
    })
  ).current;


  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <style>html, body, #map { height: 100%; margin:0; padding:0; }</style>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    </head>
    <body>
      <div id="map"></div>
      <script>
        let pickup = [${pickupCoords[0]}, ${pickupCoords[1]}];
        let dest = [${destCoords[0]}, ${destCoords[1]}];

        const map = L.map('map', { 
          center: pickup, 
          zoom: 13, 
          attributionControl: false,
          zoomControl: false
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 50
        }).addTo(map);

        const pickupMarker = L.marker(pickup, { draggable: true }).addTo(map).bindPopup("Pickup").openPopup();
        const destMarker = L.marker(dest, { draggable: true }).addTo(map).bindPopup("Destination").openPopup();

        let routeLine;

        async function fetchRoute() {
          try {
            const res = await fetch(
              'https://router.project-osrm.org/route/v1/driving/' +
              pickup[1] + ',' + pickup[0] + ';' +
              dest[1] + ',' + dest[0] +
              '?overview=full&geometries=geojson'
            );
            const data = await res.json();
            const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
            if (routeLine) map.removeLayer(routeLine);
            routeLine = L.polyline(coords, { color: 'blue', weight: 4 }).addTo(map);
            map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
          } catch (err) { console.error(err); }
        }

        fetchRoute();

        pickupMarker.on('dragend', function(e) {
          pickup = [e.target.getLatLng().lat, e.target.getLatLng().lng];
          fetchRoute();
          window.ReactNativeWebView.postMessage(JSON.stringify({ pickup, dest }));
        });

        destMarker.on('dragend', function(e) {
          dest = [e.target.getLatLng().lat, e.target.getLatLng().lng];
          fetchRoute();
          window.ReactNativeWebView.postMessage(JSON.stringify({ pickup, dest }));
        });
      </script>
    </body>
    </html>
  `;


  const styles = StyleSheet.create({
    header: {
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      position: "absolute",
      backgroundColor: "transparent",
      zIndex: 999,
    },
    bottomSection: {
      backgroundColor: themeColors.background,
    },
    icon: {
      padding: 7,
      borderRadius: 30,
      backgroundColor: "#ffffff5b",
    },
    panel: {
      position: "absolute",
      left: 0,
      right: 0,
      height: Dimensions.get("window").height,
      backgroundColor: themeColors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    handle: {
      width: 50,
      height: 5,
      backgroundColor: "#ccc",
      borderRadius: 3,
      alignSelf: "center",
      marginVertical: 10,
    },
    rideItem: {
      padding: 20,
      borderBottomWidth: 0,
      borderBottomColor: themeColors.btn,
    },
    rideName: {
      fontWeight: "bold",
      fontSize: 16,
    },
    paymentContainer: {
      padding: 20,
    },
    paymentLabel: {
      fontWeight: "bold",
      marginBottom: 10,
    },
    paymentOptions: {
      flexDirection: "row",
      gap: 10,
    },
    paymentButton: {
      paddingVertical: 3,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: themeColors.btn,
    },
    paymentButtonSelected: {
      backgroundColor: themeColors.btn,
      borderColor: themeColors.btn,
    },
    paymentText: {
      color: themeColors.text,
    },
    chooseButton: {
      margin: 20,
      backgroundColor: themeColors.btn,
      borderRadius: 10,
      alignItems: "center",
    },
    chooseButtonText: {
      fontSize: 16,
      fontWeight: "bold",
    },

  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={handleBack}>
          <AntDesign name="arrowleft" size={24} color={themeColors.color1_500} />
        </TouchableOpacity>
      </ThemedView>

      {/* Map */}
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={{ width, height }}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          setPickupCoords([data.pickup[0], data.pickup[1]]);
          setDestCoords([data.dest[0], data.dest[1]]);

          // Log the updated coordinates
          console.log("Updated Pickup:", data.pickup);
          console.log("Updated Destination:", data.dest);
        }}
      />

      <Animated.View
        style={[styles.panel, { top: panY }]}
        {...panResponder.panHandlers}
      >
        <ThemedView style={styles.handle} />
        <ThemedText type="subtitle" style={{ textAlign: "center", paddingVertical: 10 }}>Choose a ride</ThemedText>
        <ThemedView style={{ flex: 1 }}>
          {/* Scrollable ride list */}
          <FlatList
            data={rides}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.rideItem,
                  selectedRide.id === item.id && { backgroundColor: "#f0f0f00c" },
                ]}
                onPress={() => setSelectedRide(item)}
              >
                <ThemedText style={styles.rideName}>{item.name}</ThemedText>
                <ThemedText>{item.price} • {item.duration}</ThemedText>
              </TouchableOpacity>
            )}
          />

        </ThemedView>
      </Animated.View>
      {/* Bottom fixed section */}
      <ThemedView style={styles.bottomSection}>
        {/* Payment Type */}
        <ThemedView style={styles.paymentContainer}>
          <ThemedText style={styles.paymentLabel}>Payment Type:</ThemedText>
          <ThemedView style={styles.paymentOptions}>
            {["Cash", "Card", "Wallet"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.paymentButton,
                  paymentType === type && styles.paymentButtonSelected,
                ]}
                onPress={() => setPaymentType(type)}
              >
                <ThemedText
                  style={[
                    styles.paymentText,
                    paymentType === type && { color: "#fff" },
                  ]}
                >
                  {type}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Choose Ride Button */}
        <ThemedButton style={styles.chooseButton}
          title={`Choose ${selectedRide.name}`}>
        </ThemedButton>
      </ThemedView>

    </SafeAreaView>
  );
}