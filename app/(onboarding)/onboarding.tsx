import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { storeData } from "@/utils/utils";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import { View, Image, Pressable, SafeAreaView } from "react-native";

interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  image: any;
  color: string;
}

const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    title: "Education 🎓",
    description:
      "Education is the foundation of personal growth and societal progress, equipping individuals with knowledge, critical thinking, and problem-solving skills.",
    image: require("@/assets/onboarding-assets/education-illustration.png"),
    color: "bg-education",
  },
  {
    id: 2,
    title: "Employment 💼",
    description:
      "PMYP has worked to provide employment opportunities to the country's youth so they can earn their livelihoods and contribute to the nation's socio-economic progress.",
    image: require("@/assets/onboarding-assets/employment-illustration.png"),
    color: "bg-employment",
  },
  {
    id: 3,
    title: "Engagement 🧩",
    description:
      "Sports Talent Hunt Programme and a myriad of fun engagement activities, PMYP ensures our youth has access to healthy physical activities to create a strong and confident youth!",
    image: require("@/assets/onboarding-assets/engagement-illustration.png"),
    color: "bg-engagement",
  },
  {
    id: 4,
    title: "Environment 🌱",
    description:
      "Through our environmental initiatives, we strive to educate and engage the youth in environmental conservation, waste management, and sustainable practices.",
    image: require("@/assets/onboarding-assets/enviornment-illustration.png"),
    color: "bg-environment",
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleSkip = async () => {
    try {
      // Set onboarding completed flag
      await storeData("onboardingCompleted", true);
      // Navigate to login screen
      router.replace("/login");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSkip();
    }
  };

  const dotsColors: any = {
    0: "w-5 bg-education",
    1: "w-5 bg-employment",
    2: "w-5 bg-engagement",
    3: "w-5 bg-environment",
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center px-5 mt-5 justify-center">
        <Image
          source={require("@/assets/images/pmpy.png")}
          className="w-3/4 h-[60px] self-center mt-5"
          resizeMode="contain"
        />
        <Image
          source={onboardingData[currentIndex].image}
          className="w-full h-[300px] my-8"
          resizeMode="contain"
        />

        <Text className="text-2xl font-bold mb-2.5 text-center">
          {onboardingData[currentIndex].title}
        </Text>

        <Text className="text-base text-center text-gray-600 leading-6 px-5">
          {onboardingData[currentIndex].description}
        </Text>

        <View className="flex-row mt-8 items-center">
          {onboardingData.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded mx-1 ${
                index === currentIndex ? dotsColors[index] : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </View>
      </View>

      {/* Bottom Buttons */}
      <View className="flex-row justify-between items-center px-5 pb-10">
        <Pressable onPress={handleSkip}>
          <Text className="text-gray-600">Skip</Text>
        </Pressable>
        {currentIndex === onboardingData.length - 1 ? (
          <Pressable
            onPress={handleSkip}
            className="bg-environment px-6 py-3 rounded-full text-white"
          >
            <Text className="text-white">Get Started</Text>
          </Pressable>
        ) : (
          <Pressable
            className={cn(
              "w-[50px] h-[50px] rounded-full justify-center items-center",
              onboardingData[currentIndex].color
            )}
            onPress={handleNext}
          >
            <ChevronRight color={"#fff"} size={20} strokeWidth={1.5} />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
