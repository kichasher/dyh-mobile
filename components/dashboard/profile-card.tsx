import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Info } from "lucide-react-native";
import { Button } from "../ui/button";

type Props = {};

const ProfileCard = (props: Props) => {
  return (
    <Card className="rounded-2xl flex-1 border-0 shadow bg-[#D8EDE4]">
      <CardHeader className="flex flex-row gap-2">
        {[1, 2, 3, 4].map((index) => (
          <View key={index} className="flex-1 h-2 rounded-full bg-primary" />
        ))}
      </CardHeader>
      <CardContent className="flex-1 bg-gradient-to-tr from-white to-green-100">
        <View className="flex-row items-center mb-2">
          <Text className="text-4xl font-bold text-gray-900">75%</Text>
          <Text className="text-gray-600 text-lg ml-3 flex-1">
            Of Your Profile Is Complete
          </Text>
        </View>
        <Text className="text-xl font-bold text-gray-900 mb-2">
          Complete Your Profile 🚀
        </Text>
        <Text className="text-gray-600 mb-4">
          To learn more about building a great profile check out our PMYP course
          and get pro tips on our forum when you get to 100% you get verified as
          an approved talent
        </Text>
        <View className="flex-row justify-between items-center gap-4">
          <Pressable className="flex-row items-center">
            <Info size={20} color="#374151" />
            <Text className="text-gray-700 font-medium ml-2">
              Why Is This Important?
            </Text>
          </Pressable>
          <Button className="rounded-full">
            <Text className="text-white font-semibold text-sm">
              Complete Profile
            </Text>
          </Button>
        </View>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({});
