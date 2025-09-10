import React from "react";
import { TouchableOpacity, Text, StyleSheet, type TouchableOpacityProps } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export type ThemedButtonProps = TouchableOpacityProps & {
  title?: string;
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'icon' | 'outline';
};

export function ThemedButton({
  title,
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedButtonProps) {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    base: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
      borderColor: themeColors.btn,
      backgroundColor: themeColors.btn
    },
    baseText: {
      fontSize: 16,
      fontWeight: "600",
    },
    icons: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 2,

    },
    text: {
      fontSize: 16,
      fontWeight: "600",
      color: type === 'outline' ? themeColors.btn : themeColors.background
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.base,
        type === 'icon' ? styles.icons : undefined,
        type === 'outline' ? styles.outline : undefined,
        style,
      ]}
      {...rest}>
      <Text style={[styles.text]}>{title}</Text>
    </TouchableOpacity>
  );
}

