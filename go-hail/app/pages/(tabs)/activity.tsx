import React from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../../../constants/Colors";

const { width, height } = Dimensions.get('window');

export default function Activity() {
    
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  return (
    <SafeAreaView>

    </SafeAreaView>
  );
}