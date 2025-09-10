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
    Text,
    Image,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ui/ThemedButton";

const { width, height } = Dimensions.get("window");

export default function Register() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? "light"];

    const [step, setStep] = useState(1);
    const otpRefs = useRef<(TextInput | null)[]>([]);
    const [otpSent, setOtpSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const resendInterval = useRef<number | null>(null);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (step === 2 && !otpSent) {
            sendOtp();
        }
    }, [step]);

    useEffect(() => {
        // Cleanup interval when unmounting
        return () => {
            if (resendInterval.current) clearInterval(resendInterval.current);
        };
    }, []);

    useEffect(() => {
        // Auto-submit OTP when all 5 digits are filled
        if (otp.join("").length === 5) {
            verifyOtp();
        }
    }, [otp]);

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else router.back();
    };

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleNext = () => {
        if (!formData.username || !formData.email || !formData.password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            Alert.alert("Error", "Invalid email address");
            return;
        }
        if (formData.password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters");
            return;
        }
        if (!passwordMatch) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        setStep(2);
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

    const sendOtp = () => {
        console.log("OTP sent to", formData.email);
        setOtp(["", "", "", "", ""]);
        setOtpSent(true);
        setResendTimer(30);

        if (resendInterval.current) clearInterval(resendInterval.current);
        resendInterval.current = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(resendInterval.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const verifyOtp = () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length < 5) {
            Alert.alert("Error", "Please enter the complete OTP");
            return;
        }

        // TODO: Replace with backend OTP validation
        console.log("Verifying OTP:", enteredOtp);

        Alert.alert("Success", "Account created successfully!");
        router.replace("/pages/home");
    };

    const styles = StyleSheet.create({
        frame: {
            flex: 1,
        },
        container: {
            flex: 1,
            padding: 15,
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
            paddingBottom: 80,
        },
        image: {
            width: width * 0.6,
            height: height * 0.2,
            resizeMode: "contain",
        },
        inputContainer: {
            width: "100%",
            gap: 2,
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
    });

    return (
        <SafeAreaView style={styles.frame}>
            <ThemedView style={styles.container}>
                {/* header */}
                <ThemedView style={styles.header}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={handleBack}
                        accessible={true}
                        accessibilityLabel="Go back"
                    >
                        <AntDesign name="arrowleft" size={24} color={themeColors.text} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => Alert.alert("Info", "Registration Help")}
                        accessible={true}
                        accessibilityLabel="Information"
                    >
                        <AntDesign name="info" size={24} color={themeColors.text} />
                    </TouchableOpacity>
                </ThemedView>

                {/* form */}
                <KeyboardAvoidingView
                    style={styles.frame}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {/* Step 1: Registration */}
                        {step === 1 && (
                            <ThemedView style={styles.formview}>
                                <Image
                                    source={require("../../assets/images/healgo-2.png")}
                                    style={styles.image}
                                />
                                <ThemedText type="title" style={{ marginBottom: 40 }}>
                                    Create An Account
                                </ThemedText>

                                {/* Username */}
                                <ThemedView style={styles.inputContainer}>
                                    <ThemedText>Username</ThemedText>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor={themeColors.text}
                                        placeholder="JoeDoe"
                                        value={formData.username}
                                        onChangeText={(t) => handleChange("username", t)}
                                        keyboardType="default"
                                        textContentType="username"
                                        autoComplete="username"
                                        accessible={true}
                                        accessibilityLabel="Enter your username"
                                    />
                                </ThemedView>

                                {/* Email */}
                                <ThemedView style={styles.inputContainer}>
                                    <ThemedText>Email</ThemedText>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor={themeColors.text}
                                        placeholder="joe@example.co.za"
                                        value={formData.email}
                                        onChangeText={(t) => handleChange("email", t)}
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        autoComplete="email"
                                        accessible={true}
                                        accessibilityLabel="Enter your email address"
                                    />
                                </ThemedView>

                                {/* Password */}
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
                                        accessible={true}
                                        accessibilityLabel="Enter your password"
                                    />
                                </ThemedView>

                                {/* Confirm Password */}
                                <ThemedView style={styles.inputContainer}>
                                    <ThemedText>Confirm Password</ThemedText>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            !passwordMatch && { borderColor: "red" },
                                        ]}
                                        placeholderTextColor={themeColors.text}
                                        placeholder="********"
                                        value={formData.confirmPassword}
                                        onChangeText={(t) => {
                                            handleChange("confirmPassword", t);
                                            setPasswordMatch(t === formData.password);
                                        }}
                                        secureTextEntry={true}
                                        textContentType="password"
                                        autoComplete="password"
                                        accessible={true}
                                        accessibilityLabel="Confirm your password"
                                    />
                                    {!passwordMatch && (
                                        <ThemedText style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                                            Passwords do not match
                                        </ThemedText>
                                    )}
                                </ThemedView>

                                {/* Submit */}
                                <ThemedView style={styles.inputContainer}>
                                    <ThemedButton
                                        title="Create Account"
                                        onPress={handleNext}
                                        disabled={
                                            !formData.password ||
                                            !formData.confirmPassword ||
                                            !passwordMatch
                                        }
                                        accessible={true}
                                        accessibilityLabel="Create account button"
                                    />
                                </ThemedView>
                            </ThemedView>
                        )}

                        {/* Step 2: OTP Verification */}
                        {step === 2 && (
                            <ThemedView style={styles.formview}>
                                <ThemedText type="sup">Verify Your Account</ThemedText>
                                <ThemedText>
                                    Enter the 5-digit code sent to {formData.email}
                                </ThemedText>

                                {/* OTP Input */}
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
                                            accessible={true}
                                            accessibilityLabel={`OTP digit ${i + 1}`}
                                        />
                                    ))}
                                </ThemedView>

                                {/* Buttons */}
                                <ThemedView
                                    style={[
                                        styles.inputContainer,
                                        { flexDirection: "row", gap: 15 },
                                    ]}
                                >
                                    <ThemedButton
                                        style={{ width: "48%" }}
                                        title={
                                            resendTimer > 0
                                                ? `Resend (${resendTimer})`
                                                : "Resend"
                                        }
                                        onPress={sendOtp}
                                        disabled={resendTimer > 0}
                                        accessible={true}
                                        accessibilityLabel="Resend OTP button"
                                    />
                                    <ThemedButton
                                        style={{ width: "48%" }}
                                        title="Verify"
                                        onPress={verifyOtp}
                                        accessible={true}
                                        accessibilityLabel="Verify OTP button"
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
