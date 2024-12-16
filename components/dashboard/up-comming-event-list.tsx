import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar, ChevronRight } from "lucide-react-native";
import EventCard from "./event-card";

type Props = {};

const UpCommingEventList = (props: Props) => {
  return (
    <View className="mt-8">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold text-gray-900 mr-2">
            Upcoming Events 🗓️
          </Text>
          {/* <Calendar size={20} color="#374151" /> */}
        </View>
        <Pressable className="flex-row items-center">
          <Text className="text-emerald-600 font-medium mr-1">View All</Text>
          <ChevronRight size={20} color="#16a34a" />
        </Pressable>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[
          { month: "May", day: "30", title: "Product Launch" },
          { month: "May", day: "30", title: "Product Launch" },
          { month: "May", day: "30", title: "Product Launch" },
        ]}
        renderItem={({ item }) => (
          <EventCard month={item.month} day={item.day} title={item.title} />
        )}
      />
    </View>
  );
};

export default UpCommingEventList;

const styles = StyleSheet.create({});
