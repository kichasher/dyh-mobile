import React from "react";
import { LayoutContainer } from "@/components/container";
import {
  Zap,
  Calendar,
  Rocket,
  GraduationCap,
  Briefcase,
  Users,
  ChevronRight,
} from "lucide-react-native";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { LinearGradient } from "expo-linear-gradient";
import {
  ProfileCard,
  RecommendedEs,
  UpCommingEventList,
} from "@/components/dashboard";

const DashboardLayout = () => {
  const router = useRouter();

  return (
    <LayoutContainer>
      <LinearGradient
        colors={["#fff", "rgba(216, 237, 228, 1)"]}
        className="absolute top-0 left-0 right-0 bottom-0"
      />
      <ScrollView className="flex-1">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-3xl font-bold text-gray-900 mb-1">
              Welcome Ahmed 👋
            </Text>
            <Text className="text-gray-600 text-lg">
              You have <Text className="font-semibold">7 upcoming</Text> events
            </Text>
          </View>
          <View className="bg-[#eef7ee] px-4 py-2 rounded-full flex-row items-center">
            <Zap size={20} color="#16a34a" />
            <Text className="text-primary font-bold ml-1">3</Text>
          </View>
        </View>

        {/* Profile Completion Card */}
        <ProfileCard />
        {/* Upcoming Events Section */}
        <UpCommingEventList />

        {/* Recommended Section */}
        <RecommendedEs />
      </ScrollView>
    </LayoutContainer>
  );
};

export default DashboardLayout;
