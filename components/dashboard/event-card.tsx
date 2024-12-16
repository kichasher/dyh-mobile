import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

type EventCardProps = {
  month: string;
  day: string;
  title: string;
};

const EventCard = ({ month, day, title }: EventCardProps) => {
  return (
    <View className="bg-white rounded-2xl p-4 mr-4 flex-row items-center w-72">
      <View className="items-center mr-4">
        <Text className="text-emerald-600 font-semibold mb-1">{month}</Text>
        <Text className="text-2xl font-bold">{day}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800">{title}</Text>
        <Pressable className="mt-3 self-start border border-emerald-600 rounded-full px-6 py-2">
          <Text className="text-emerald-600 font-medium">Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({});
