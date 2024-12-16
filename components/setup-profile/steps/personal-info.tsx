import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { AppDispatch, RootState, setPersonalInfo } from "@/feature";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { UserRound } from "@/lib/icons";
import DropDown from "@/components/ui/dropdown";
import MultiSelectComponent from "@/components/ui/multi-select-dropdown";
import * as FileSystem from "expo-file-system";
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetLanguagesQuery,
  useGetSkillsQuery,
  useGetStatesQuery,
  useUpdateProfilePictureMutation,
} from "@/feature/services/profileApi";
import Toast from "react-native-toast-message";

const PersonalInfoStep = () => {
  const dispatch = useDispatch<AppDispatch>();
  const personalInfo = useSelector(
    (state: RootState) => state.profileForm.personalInfo
  );
  const user = useSelector((state: RootState) => state.auth.user?.user);
  const { data: contriesList } = useGetCountriesQuery({});
  const { data: statesList } = useGetStatesQuery({});
  const { data: citiesList } = useGetCitiesQuery({});
  const { data: languagesList } = useGetLanguagesQuery({});
  const [updateProfilePicture, { isLoading }] = useUpdateProfilePictureMutation(
    {}
  );

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);

      const formData = new FormData();
      const uri = result.assets[0].uri;
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("picture", {
        uri: uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      } as any);

      try {
        const res = await updateProfilePicture(formData).unwrap();

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Image uploaded successfully",
        });
        dispatch({
          type: setPersonalInfo.type,
          payload: {
            profile_picture_url: res?.url || result.assets[0].uri,
          },
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: JSON.stringify(error?.data?.message),
        });
      }
    }
  };


  return (
    <ScrollView className="flex-1">
      <View className="px-2">
        <View>
          <Text className="text-2xl font-bold">
            Before Get Started Ahmed, We Need Information About You 🚀
          </Text>
          <Text className="text-gray-600 mt-2">
            Add any certifications/diplomas, extracurricular activities &
            skills.
          </Text>
        </View>

        <View className="flex flex-col gap-4 mt-4">
          <View>
            <Text className="text-base mb-2 text-gray-500">
              Upload Profile Image
            </Text>
            <View className="flex flex-row items-center gap-4">
              <View>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    className="w-28 h-28 rounded-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="items-center justify-center bg-gray-300 rounded-full p-4">
                    <UserRound
                      size={72}
                      strokeWidth={1}
                      className="text-gray-500"
                    />
                  </View>
                )}
              </View>
              <Button
                variant={"outline"}
                size={"sm"}
                className="h-10 border-primary"
                onPress={handleImageUpload}
              >
                <Text className="text-xs font-normal text-primary">
                  Choose Image
                </Text>
              </Button>
            </View>
          </View>

          <View>
            <Text className="mb-1 text-gray-500 ">
              Full Name <Text className="text-red-500">*</Text>
            </Text>
            <Input
              placeholder="Enter your full name"
              value={
                personalInfo.full_name ||
                user?.profile?.first_name + " " + user?.profile?.last_name
              }
              onChangeText={(text) =>
                dispatch({
                  type: setPersonalInfo.type,
                  payload: { full_name: text },
                })
              }
              className="native:text-base"
            />
          </View>

          <View>
            <Text className="mb-1 text-gray-500 ">
              Email <Text className="text-red-500">*</Text>
            </Text>
            <Input
              placeholder="Enter your email"
              value={personalInfo.email || user?.email}
              onChangeText={(text) =>
                dispatch({
                  type: setPersonalInfo.type,
                  payload: { email: text },
                })
              }
              keyboardType="email-address"
              autoCapitalize="none"
              className="native:text-base"
            />
          </View>

          <View>
            <Text className="mb-1 text-gray-500 ">
              Country <Text className="text-red-500">*</Text>
            </Text>
            <DropDown
              value={personalInfo.country_id}
              labelField={"country"}
              valueField={"id"}
              onChangeValue={(text) =>
                dispatch({
                  type: setPersonalInfo.type,
                  payload: { country_id: text },
                })
              }
              data={contriesList}
            />
          </View>

          <View>
            <Text className="mb-1 text-gray-500 ">
              State <Text className="text-red-500">*</Text>
            </Text>
            <DropDown
              value={personalInfo.state_id}
              labelField={"state"}
              valueField={"id"}
              onChangeValue={(text) =>
                dispatch({
                  type: setPersonalInfo.type,
                  payload: { state_id: text },
                })
              }
              data={statesList}
            />
          </View>

          <View>
            <Text className="mb-1 text-gray-500 ">
              City <Text className="text-red-500">*</Text>
            </Text>
            <DropDown
              value={personalInfo.city_id}
              labelField={"city"}
              valueField={"id"}
              onChangeValue={(text) =>
                dispatch({
                  type: setPersonalInfo.type,
                  payload: { city_id: text },
                })
              }
              data={citiesList}
            />
          </View>

          <View>
            <Text className="mb-1 text-gray-500 ">Language</Text>
            <MultiSelectComponent
              value={personalInfo.language}
              labelField={"language"}
              valueField={"id"}
              onChangeValue={(text) =>
                dispatch({
                  type: setPersonalInfo.type,
                  payload: { language: text },
                })
              }
              data={languagesList}
            />
          </View>

          <View>
            <Text className="mb-1 text-gray-500 ">Skills</Text>
            <MultiSelectComponent
              value={personalInfo.skills}
              labelField={"name"}
              valueField={"id"}
              onChangeValue={(text) =>
                dispatch({
                  type: setPersonalInfo.type,
                  payload: { skills: text },
                })
              }
              data={[]}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default PersonalInfoStep;
