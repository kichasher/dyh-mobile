import BottomSheetComp from "@/components/ui/bottom-sheet-modal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { RootState } from "@/feature";
import { useGetCitiesQuery, useGetCountriesQuery, useGetDegreeTypesQuery, useGetInstituteNamesQuery, useGetJobTitlesQuery, useGetLanguagesQuery, useGetProfileQuery, useGetStatesQuery } from "@/feature/services/profileApi";
import { Education } from "@/types/common-types";
import { Dot, Globe, Mail, MapPin } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";

const ProfileReview = () => {
  const user = useSelector(
    (state: RootState) => state.auth.user?.user?.profile
  );
  const { data: countries } = useGetCountriesQuery({});
  const { data: states } = useGetStatesQuery({});
  const { data: cities } = useGetCitiesQuery({});
  const { data: degreeTypes } = useGetDegreeTypesQuery({});
  const { data: instituteNames } = useGetInstituteNamesQuery({});
  const { data: jobTitles } = useGetJobTitlesQuery({});
  const { data: languages } = useGetLanguagesQuery({});
  
  const { data: profile } = useGetProfileQuery({});
  
  // const educationData = Array.isArray(profile?.profile?.education)
  // ? profile?.profile?.education
  // : [];
  // console.log("🚀 ~ profile", JSON.parse(educationData));

  // const findValue = (arr: any[], key: string, value: string) => {
  //   return arr?.find((item: any) => item[key] === value);
  // };

  return (
    <>
      <ScrollView className="flex-1">
        <View className="px-2">
          <View>
            <Text className="text-2xl font-bold">Review Your Profile</Text>
            <Text className="text-gray-600 mt-2">
              Take a moment to review your profile before getting started!
            </Text>
          </View>

          <Card className="mt-6">
            <CardHeader className="p-4 flex flex-col gap-4">
              <View className="flex flex-row gap-4">
                <View>
                  {user?.profile_picture_url ? (
                    // <Image
                    //   source={{ uri: `${user?.profile_picture_url}` }}
                    //   className="w-20 h-20 rounded-full"
                    // />
                    <View className="w-28 h-28 rounded-full bg-gray-200"></View>
                  ) : (
                    <View className="w-28 h-28 rounded-full bg-gray-200"></View>
                  )}
                </View>
                <View className="flex flex-col gap-1">
                  <Text className="text-2xl font-medium">
                    {profile?.profile?.first_name} {profile?.profile?.last_name}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <Mail size={16} color={"gray"} />
                    <Text>{profile?.email}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <MapPin size={16} color={"gray"} />
                    <Text>Pakistan</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Globe size={16} color={"gray"} />
                    {["English", "Urdu"].map((item, index) => (
                      <Text className="bg-green-100 px-2 rounded" key={index}>
                        {item}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
              <View className="flex flex-row gap-2">
                <Text>Skills</Text>
                {["React Native", "Flutter", "React"].map((item, index) => (
                  <Text className="bg-gray-200 px-2 rounded" key={index}>
                    {item}
                  </Text>
                ))}
              </View>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 mt-4">
              {profile?.profile?.education?.length > 0 && (
                <View className="border-[1px] border-education rounded-md relative p-4 flex flex-col gap-1">
                  <Text className="absolute -top-4 left-2 bg-white w-24 text-center">
                    Education
                  </Text>
                  {profile?.profile?.education?.map((item: Education, index: number) => (
                    <View key={index}>
                      <Text className="text-xl font-medium">
                        {JSON.stringify(item?.institue_name)}
                      </Text>
                      <Text className="text-md font-medium">
                        {/* {item?.} */}
                      </Text>
                      <View className="flex flex-row gap-1 items-center">
                        <Dot size={16} color={"gray"} />
                        <Text className="text-education text-lg">Master</Text>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <MapPin size={16} color={"gray"} />
                        <Text>Pakistan</Text>
                      </View>
                      <Text>12 Jan, 2024 - In Progress</Text>
                    </View>
                  ))}
                </View>
              )}
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </>
  );
};
export default ProfileReview;
