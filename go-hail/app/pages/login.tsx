import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    useColorScheme,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from '../../constants/Colors'; import { ThemedView } from "@/components/ThemedView";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ui/ThemedButton";


const { width, height } = Dimensions.get('window');

export default function Login() {

    const router = useRouter();
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? "light"];

    const [step, setStep] = useState(1);
    const otpRefs = useRef<(TextInput | null)[]>([]);
    const [otpSent, setOtpSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const resendInterval = useRef<NodeJS.Timeout | null>(null);

    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    useEffect(() => {
        if (step === 2 && !otpSent) {
            sendOtp();
        }
    }, [step]);

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else router.back();
    };

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else {

        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next
            if (value && index < otp.length - 1) {
                otpRefs.current[index + 1]?.focus();
            }

        }
    };

    // Call this to "send OTP"
    const sendOtp = () => {
        console.log("OTP sent to", formData.username);
        setOtp(["", "", "", "", ""]);
        setOtpSent(true);
        setResendTimer(30);

        if (resendInterval.current) clearInterval(resendInterval.current);
        resendInterval.current = setInterval(() => {
            setResendTimer(prev => {
                if (prev <= 1) {
                    clearInterval(resendInterval.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Call this to "verify OTP"
    const verifyOtp = () => {
        const enteredOtp = otp.join("");
        console.log("Verifying OTP:", enteredOtp);
        console.log("Form Data:", formData);
        // router.replace("/pages/home");

        // Add your actual verification logic here
        // For demo, we just log
    };

    const styles = StyleSheet.create({
        frame: {
            flex: 1,
        },
        container: {
            flex: 1,
            padding: 15
        },
        header: {
            paddingVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        icon: {
            padding: 7,
            borderRadius: 30,
            backgroundColor: "#26667f27",
        },
        formview: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: 10,
        },
        image: {
            width: width * 0.6,
            height: height * 0.2,
            resizeMode: "contain",
        },
        inputContainer: {
            width: "100%",
            gap: 2
        },
        input: {
            width: "100%",
            borderWidth: 1,
            borderColor: themeColors.btn,
            borderRadius: 5,
            height: 40,
            paddingHorizontal: 10,
            marginBottom: 5,
            fontSize: 16,
            color: themeColors.text,
        },
        formContainer: {
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
        },
        otpContainer: {
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
            gap: 10,
        },
        otpInput: {
            width: 50,
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            textAlign: "center",
            fontSize: 20,
            color: themeColors.text,
            borderColor: themeColors.tint,
        },
        dividerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 25,
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: themeColors.btn,
        },
        dividerText: {
            marginHorizontal: 10,
            color: '#888',
            fontWeight: 'bold',
        },

        socialLogin: {
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        socialBtn: {
            width: "48%",
            height: 40,
            borderWidth: 1,
            borderColor: themeColors.btn,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50
        },
    });


    return (
        <SafeAreaView style={styles.frame}>
            <ThemedView style={styles.container}>
                {/* header */}
                <ThemedView style={styles.header}>
                    <TouchableOpacity style={styles.icon} onPress={handleBack}>
                        <AntDesign name="arrowleft" size={24} color={themeColors.text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={handleBack}>
                        <AntDesign name="info" size={24} color={themeColors.text} />
                    </TouchableOpacity>
                </ThemedView>

                {/* form */}
                <KeyboardAvoidingView style={styles.frame} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {/* Step 1: Registration */}
                        {step === 1 && (
                            <ThemedView style={styles.formview}>
                                <Image source={require("../../assets/images/healgo-2.png")} style={styles.image} />
                                <ThemedText type="title" style={[{ marginBottom: 40 }]}>Account Login</ThemedText>


                                <ThemedView style={styles.inputContainer}>
                                    <ThemedText>Email</ThemedText>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor={themeColors.text}
                                        placeholder="joe@example.co.za"
                                        value={formData.username}
                                        onChangeText={(t) => handleChange("email", t)}
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        autoComplete="email"

                                    />
                                </ThemedView>
                                <ThemedView style={styles.inputContainer}>
                                    <ThemedText>Password</ThemedText>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor={themeColors.text}
                                        placeholder="********"
                                        value={formData.password}
                                        onChangeText={(t) => handleChange("password", t)}
                                        secureTextEntry={true}
                                        textContentType="password"
                                        autoComplete="password"
                                    />
                                </ThemedView>
                                <ThemedView style={[{ flexDirection: "row", justifyContent: "flex-end", marginVertical: 5, width: "100%" }]}>
                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => router.replace("/pages/login")}
                                    >
                                        <ThemedText style={[{ color: themeColors.text }]}>Reset Password</ThemedText>
                                    </TouchableOpacity>
                                </ThemedView>
                                <ThemedView style={styles.inputContainer}>
                                    <ThemedButton
                                        title="Login"
                                        onPress={handleNext}
                                    />
                                </ThemedView>
                            </ThemedView>
                        )}

                        {/* Step 2: OTP Verification */}
                        {step === 2 && (
                            <ThemedView style={styles.formview}>
                                <ThemedText type="sup">Verify Your Account</ThemedText>
                                <ThemedText>
                                    Enter the 5-digit code sent to 
                                </ThemedText>

                                <ThemedView style={styles.otpContainer}>
                                    {otp.map((digit, i) => (
                                        <TextInput
                                            key={i}
                                            style={styles.otpInput}
                                            keyboardType="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChangeText={(t) => handleOtpChange(i, t)}
                                            ref={(ref) => {
                                                otpRefs.current[i] = ref;
                                            }}
                                        />
                                    ))}
                                </ThemedView>
                                <ThemedView style={[styles.inputContainer, { flexDirection: "row", gap: 15 }]}>
                                    <ThemedButton
                                        style={{ width: "48%" }}
                                        title={resendTimer > 0 ? `Resend (${resendTimer})` : "Resend"}
                                        onPress={sendOtp}
                                        disabled={resendTimer > 0}
                                    />
                                    <ThemedButton
                                        style={{ width: "48%" }}
                                        title="Verify"
                                        onPress={verifyOtp}
                                    />

                                </ThemedView>
                            </ThemedView>
                        )}
                    </ScrollView>
                </KeyboardAvoidingView>

            </ThemedView>
        </SafeAreaView>
    );
}
