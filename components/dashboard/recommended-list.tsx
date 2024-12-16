import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {};

const RecommendedEs = (props: Props) => {
  const [value, setValue] = React.useState("employment");
  const tabs_list = [
    {
      id: 0,
      value: "education",
      label: "Education",
    },
    {
      id: 1,
      value: "employment",
      label: "Employment",
    },
    {
      id: 2,
      value: "engagement",
      label: "Engagement",
    },
    {
      id: 3,
      value: "environment",
      label: "Environment",
    },
  ];

  const tabs_content = [
    {
      id: 0,
      value: "education",
    },
    {
      id: 1,
      value: "employment",
    },
    {
      id: 2,
      value: "engagement",
    },
    {
      id: 3,
      value: "environment",
    },
  ];

  const tabs_colors: any = {
    employment: {
      btn: "border-2 border-employment bg-white",
      text: "text-employment",
    },
    engagement: {
      btn: "border-2 border-engagement bg-white",
      text: "text-engagement",
    },
    environment: {
      btn: "border-2 border-environment bg-white",
      text: "text-environment",
    },
    education: {
      btn: "border-2 border-education bg-white",
      text: "text-education",
    },
  };

  return (
    <View>
      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Recommended For You ✨
      </Text>
      <ScrollView
        className="flex-1"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {tabs_list.map((tab) => (
          <Button
            key={tab.id}
            variant="outline"
            className={cn(
              "flex-1 rounded-full mr-3 native:h-[3.1rem]",
              value === tab.value && tabs_colors[tab.value].btn
            )}
            onPress={() => setValue(tab.value)}
          >
            <Text className="">{tab.label}</Text>
          </Button>
        ))}
      </ScrollView>
      <ScrollView
        className="flex-1 mt-2"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {tabs_content.map((tab) => (
          <>
            {value === tab.value && <View className="flex-1">{tab.value}</View>}
          </>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecommendedEs;

const styles = StyleSheet.create({});
