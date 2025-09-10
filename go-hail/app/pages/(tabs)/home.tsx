import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../../../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  MapPage: {
    destination: { name: string; coordinates: [number, number] };
    userLocation: [number, number] | null;
  };
};

type Suggestion = {
  id: string;
  place_name: string;
  geometry: { coordinates: [number, number] };
};

export default function Home() {

  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(
    null
  );

  const handleSelectSuggestion = (place: Suggestion) => {
    setQuery(place.place_name);
    setSuggestions([]);

    navigation.navigate("pages/ride-choice" as any, {
      destination: {
        name: place.place_name,
        coordinates: place.geometry.coordinates,
      },
      userLocation: currentLocation,
    });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setCurrentLocation([loc.coords.latitude, loc.coords.longitude]);
    })();
  }, []);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&limit=5&countrycodes=za`,
          {
            headers: { "User-Agent": "ExpoApp/1.0 (example@email.com)" },
          }
        );
        const data = await res.json();

        setSuggestions(
          data.map((item: any) => ({
            id: item.place_id.toString(),
            place_name: item.display_name,
            geometry: {
              coordinates: [parseFloat(item.lon), parseFloat(item.lat)],
            },
          }))
        );
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: themeColors.background
    },
    inputBox: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: themeColors.icon,
      borderRadius: 5,
      padding: 6,
      marginBottom: 10,
    },
    input: {
      flex: 1,
      color: themeColors.text,
      paddingHorizontal: 8
    },
    suggestionItem: {
      padding: 10,
      borderWidth: 1,
      borderColor: themeColors.icon,
      borderRadius: 5,
    },
    suggestionText: {
      color: themeColors.text
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputBox}>
        <AntDesign name="search1" size={20} color={themeColors.text} />
        <TextInput
          style={styles.input}
          placeholder="Search location..."
          placeholderTextColor={themeColors.text}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => handleSelectSuggestion(item)}
          >
            <Text style={styles.suggestionText}>{item.place_name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

