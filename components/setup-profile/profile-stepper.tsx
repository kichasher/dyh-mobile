import React from "react";
import { View, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  CertificateStep,
  EducationStep,
  ExperienceStep,
  PersonalInfoStep,
  ProfileReview,
} from "./steps";
import { RootState, AppDispatch, prevStep, nextStep } from "@/feature";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useRouter } from "expo-router";
import { useUpdateProfileMutation } from "@/feature/services/profileApi";
import Toast from "react-native-toast-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetComp from "../ui/bottom-sheet-modal";

const ProfileStepper: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useRouter();
  const { currentStep, personalInfo, education, experience, certificates } =
    useSelector((state: RootState) => state.profileForm);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const successRef = React.useRef<BottomSheetModal>(null);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <EducationStep />;
      case 2:
        return <ExperienceStep />;
      case 3:
        return <CertificateStep />;
      case 4:
        return <ProfileReview />;
      default:
        return <PersonalInfoStep />;
    }
  };

  const renderProgressBar = () => {
    const totalSteps = 4;
    // const progress = (currentStep / totalSteps) * 100;

    return (
      <View className="flex-row gap-2 mb-6 px-2">
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index}
            className={`h-1 flex-1 rounded-full ${
              index < currentStep ? "bg-green-500" : "bg-gray-200"
            }`}
          />
        ))}
      </View>
    );
  };
  async function handleNextStep() {
    try {
      const res = await updateProfile({
        ...personalInfo,
        education,
        experience,
        additionals: certificates,
      });
      dispatch({ type: nextStep.type });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: JSON.stringify(error?.data?.message),
      });
    }
  }

  function handleSuccess() {
    successRef.current?.present();
  }

  return (
    <>
      <View className="px-4 h-full">
        {renderProgressBar()}
        {renderStep()}
        <View className="flex-row justify-between mt-4 pb-4">
          {currentStep > 0 && currentStep !== 4 && (
            <Button
              variant={"ghost"}
              onPress={() => dispatch({ type: nextStep.type })}
            >
              <Text>Skip for now</Text>
            </Button>
          )}
          {currentStep === 4 ? (
            <Button
              className="w-full"
              onPress={handleSuccess}
            >
              <Text>Create Profile</Text>
            </Button>
          ) : (
            <Button className="flex-1" onPress={() => handleNextStep()}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text>Next Step</Text>
              )}
            </Button>
          )}
        </View>
      </View>
      <BottomSheetComp ref={successRef}>
        <View className="flex items-center px-4 flex-col gap-4">
          <Image
            source={require("@/assets/images/successfully-created-profile.png")}
            className="aspect-square w-64 h-64"
          />
          <View>
            <Text className="text-4xl font-medium">You are all Set 🎉</Text>
            <Text className="text-xl text-center">
              Congrats, you have successfully
            </Text>
            <Text className="text-xl text-center"> created your profile</Text>
          </View>
          <Button className="w-full" onPress={() => navigate.replace("/(tabs)/dashboard")}>
            <Text>Continue</Text>
          </Button>
        </View>
      </BottomSheetComp>
    </>
  );
};

export default ProfileStepper;
