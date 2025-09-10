import { Tabs, usePathname } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, useColorScheme, ActivityIndicator, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import "react-native-get-random-values";


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];
  const pathname = usePathname();
  const [iconsLoaded, setIconsLoaded] = useState(false);

  useEffect(() => {
    Ionicons.loadFont().then(() => setIconsLoaded(true));
  }, []);

  if (!iconsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: themeColors.background,
        }}
      >
        <ActivityIndicator size="large" color={themeColors.tint} />
      </View>
    );
  }

  const headerTitles: Record<string, string> = {
    "/pages/home": "Home",
    "/pages/account": "Account",
    "/pages/history": "History",
    "/pages/activity": "Activity",
  };

  const currentHeaderTitle = headerTitles[pathname] ?? "";

  const styles = StyleSheet.create({
    header: {
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "700",
    },
  });

  // Map each tab to an icon
  const tabIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    home: "home",
    activity: "people",
    history: "time",
    account: "person-circle",
  };

  // Render both icon and label
  const renderTabIcon = (name: string, focused: boolean, label: string) => (
    <View style={{ alignItems: "center", justifyContent: "center" , width: 100}}>
      <Ionicons
        name={tabIcons[name]}
        size={22}
        color={focused ? themeColors.tint : themeColors.icon}
      />
      <Text
        style={{
          fontSize: 12,
          marginTop: 2,
          color: focused ? themeColors.tint : themeColors.icon,
        }}
      >
        {label}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: themeColors.background }}>
      
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false, // hide default labels because we render them manually
          tabBarStyle: {
           bottom: 5,
           height: 50,
           paddingHorizontal: 10,
           paddingTop: 10,
           borderRadius: 5,
           backgroundColor: themeColors.background,
           justifyContent: "space-between",
           alignItems: "center",
          },
          tabBarButton: (props: any) => (
            <Pressable {...props} android_ripple={null} style={[props.style]} />
          ),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => renderTabIcon("home", focused, "Home"),
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            tabBarIcon: ({ focused }) => renderTabIcon("activity", focused, "Activity"),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            tabBarIcon: ({ focused }) => renderTabIcon("history", focused, "History"),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            tabBarIcon: ({ focused }) => renderTabIcon("account", focused, "Account"),
          }}
        />
      </Tabs>
    </View>
  );
}
