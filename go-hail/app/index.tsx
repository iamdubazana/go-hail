import { StyleSheet, Dimensions, Image, TouchableOpacity, Text, View, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import Swiper from 'react-native-swiper';
import "react-native-get-random-values";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedText } from "@/components/ThemedText";


const { width, height } = Dimensions.get('window');

export default function Landing() {

    const router = useRouter();
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? "light"];

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.background
        },
        topRightImage: {
            position: 'absolute',
            top: -10,
            right: -200,
            width: 500,
            height: 500,
        },
        bottomLeftImage: {
            position: 'absolute',
            bottom: -100,
            left: -200,
            width: 500,
            height: 500,
        },
        content: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        text: {
            fontSize: 24,
            color: '#fff',
            fontWeight: 'bold',
        },
        slide: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            backgroundColor: "transparent"
        },
        image: {
            width: width * 0.8,
            height: height * 0.8,
            resizeMode: 'contain',
        },
        go: {
            width: width * 0.8,
            height: height * 0.4,
            resizeMode: 'contain',
        },
        bottonContainer: {
            gap: 10,
            paddingVertical: 10,
            width: width * 0.9,
            marginTop: 50
        },
    });

    return (
        <SafeAreaView style={styles.container}>

            {/* <Image
                source={require("../assets/images/healgo-2.png")}
                style={styles.topRightImage}
                resizeMode="cover"
            />

            <Image
                source={require("../assets/images/healgo-2.png")}
                style={styles.bottomLeftImage}
                resizeMode="cover"
            /> */}

            <Swiper
                loop={false}
                activeDotColor={themeColors.btn}
                dotColor={themeColors.color2_100}
                autoplayTimeout={2}
                autoplay={true}
                showsButtons={false}
                dotStyle={
                    {
                        marginBottom: 30,
                        width: 10,
                        height: 10,
                        borderRadius: 10
                    }
                }
                activeDotStyle={
                    {
                        marginBottom: 30,
                        width: 15,
                        height: 15,
                        borderRadius: 10
                    }
                }
            >
                {/* Slide */}
                <ThemedView style={[styles.slide]}>
                    <Image source={require("../assets/images/healgo-2.png")} style={styles.image} />
                </ThemedView>
                {/* Slide 2 */}
                <ThemedView style={[styles.slide]}>
                    <Image source={require("../assets/images/care.png")} style={styles.image} />
                </ThemedView>
                {/* Slide 3 */}
                <ThemedView style={[styles.slide]}>
                    <Image source={require("../assets/images/care.png")} style={styles.image} />
                </ThemedView>
                {/* Slide 4 */}
                <ThemedView style={[styles.slide]}>
                    <Image source={require("../assets/images/care.png")} style={styles.image} />
                </ThemedView>

                {/* Slide 5 */}
                <ThemedView style={[styles.slide]}>
                    <Image source={require("../assets/images/healgo-2.png")} style={styles.go} />
                    <ThemedView style={styles.bottonContainer}>
                        <ThemedButton
                            title="Get Started"
                            onPress={() => router.push("/pages/register")}
                        />
                    </ThemedView>
                    <ThemedView style={[{ flexDirection: "row", marginTop: 10 }]}>
                        <ThemedText>Already have an account? </ThemedText>
                        <TouchableOpacity
                            style={[]}
                            onPress={() => router.push("/pages/login")}
                        >
                            <Text style={[{ color: themeColors.text, fontSize: 18, fontWeight: "bold" }]}>Login</Text>
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>

            </Swiper>
        </SafeAreaView>
    );
}
