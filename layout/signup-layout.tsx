import { SignupForm } from "@/components/signup";
import React, { useReducer, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { View } from "react-native";
import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { SignInAsBtn } from "@/components/login";
import CNICInput from "@/components/ui/cnic-formatted";
import BottomSheetComp from "@/components/ui/bottom-sheet-modal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DatePicker from "react-native-date-picker";
import { CalendarIcon } from "lucide-react-native";
import { useSignupMutation } from "@/feature/services/authApi";
import Toast from "react-native-toast-message";

type State = {
  first_name: string;
  last_name: string;
  email: string;
  cnic: string;
  password: string;
  phone_number: string;
  age: Date;
  acceptTerms: boolean;
  open: boolean;
};

type Action = Partial<State>;
const SignupLayout = () => {
  const navigation = useRouter();
  const terms_conditions = useRef<BottomSheetModal>(null);
  const [signup, { isLoading }] = useSignupMutation();
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => ({ ...state, ...action }),
    {
      first_name: "",
      last_name: "",
      email: "",
      cnic: "",
      password: "",
      phone_number: "",
      age: new Date(),
      acceptTerms: false,
      open: false,
    }
  );
  function handleOpenTermsSheet() {
    terms_conditions.current?.present();
  }

  async function handleSignup() {
    try {
      const res = await signup(state).unwrap();
      console.log("🚀 ~ handleSignup ~ res:", JSON.stringify(res, null, 2));
      terms_conditions.current?.dismiss();
      navigation.push(`/signup-otp?email=${state.email}`);
    } catch (error) {
      console.log("🚀 ~ handleSignup ~ error:", JSON.stringify(error, null, 2));
      Toast.show({
        type: "error",
        text1: "Error",
        text2: JSON.stringify(error?.data?.message),
      });

      terms_conditions.current?.dismiss();
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          <SignupForm
            state={state}
            dispatch={dispatch}
            renderCNICInput={() => (
              <CNICInput
                value={state.cnic}
                onChangeText={(text) => dispatch({ cnic: text })}
                className="w-full p-4 rounded-lg border border-gray-200"
              />
            )}
          />

          <View className="mt-2">
            <Text className="mb-1 text-gray-500">Date of Birth</Text>
            <Pressable
              className="flex flex-row items-center justify-between p-3 border border-gray-200  bg-white rounded-md"
              onPress={() => dispatch({ open: true })}
            >
              <Text className="text-gray-500">
                {state.age?.toDateString() || "Select Date"}
              </Text>
              <CalendarIcon color="gray" size={20} />
            </Pressable>
          </View>

          <Button onPress={() => handleOpenTermsSheet()} className="mt-4">
            <Text className="text-white font-semibold text-base">Sign up</Text>
          </Button>

          <View
            className="flex-row justify-center items-center"
            style={{ marginTop: 16 }}
          >
            <Text className="text-gray-600">Don't have an account? </Text>
            <Link href="/login" className="text-primary">
              Sign In
            </Link>
          </View>

          <View className="flex-row items-center mt-8">
            <View className="flex-1 h-[1px] bg-gray-500" />
            <Text className="mx-4 text-gray-600">OR</Text>
            <View className="flex-1 h-[1px] bg-gray-500" />
          </View>

          <SignInAsBtn />
        </ScrollView>
      </KeyboardAvoidingView>

      <DatePicker
        modal
        open={state.open}
        date={state.age}
        mode="date"
        onConfirm={(date) => {
          dispatch({ open: false, age: date });
        }}
        onCancel={() => {
          dispatch({ open: false });
        }}
      />

      {/* Bottom sheet for Date Picker */}

      <BottomSheetComp ref={terms_conditions}>
        <View className="p-4">
          <Text className="text-3xl font-bold mb-2">
            Welcome to Digital Youth Hub!
          </Text>
          <Text className="text-base mb-2">
            Below is the privacy policy "Privacy Policy and Terms of Service
          </Text>
          <Text className="text-base mb-2">
            Before proceeding, please read and agree to our Privacy Policy and
            Terms of Service.
          </Text>
          <Text className="text-base mb-2">
            By using Digital Youth Hub, you agree to the following:
          </Text>
          <Text className="text-base mb-2">
            Data Collection: We collect your personal information (e.g., name,
            email, CNIC, date of birth) to provide platform services, connect
            you with opportunities, and enhance user experience.
          </Text>
          <Text className="text-base mb-2">
            Data Use: Your data is used for registration, profile management,
            generating insights, and sharing relevant updates.
          </Text>
          <Text className="text-base mb-2">
            Data Security: We protect your information through encryption and
            secure access protocols.
          </Text>
          <View className="mt-4 flex-row gap-4">
            <Checkbox
              checked={state.acceptTerms}
              onCheckedChange={(checked) => dispatch({ acceptTerms: checked })}
            />
            <Text className="text-gray-500">
              Accept Terms & Conditions and Privacy Policy.{" "}
            </Text>
          </View>

          <Button
            disabled={!state.acceptTerms}
            onPress={() => handleSignup()}
            className="mt-4"
          >
            <Text className="text-white font-semibold text-base">Agree</Text>
          </Button>
        </View>
      </BottomSheetComp>
    </>
  );
};

export default SignupLayout;
