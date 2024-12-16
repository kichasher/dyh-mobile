import React, { useCallback, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  AppDispatch,
  removeExperience,
  RootState,
  updateExperience,
} from "@/feature";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "@/lib/icons";
import { Experience } from "@/types/common-types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ExperienceForm } from "../profile-form";
import {
  useGetCitiesQuery,
  useGetCompanyNamesQuery,
  useGetCountriesQuery,
  useGetJobTitlesQuery,
  useGetStatesQuery,
} from "@/feature/services/profileApi";
import DatePicker from "react-native-date-picker";

interface DatePickerState {
  isOpen: boolean;
  educationIndex: number;
  dateType: "start_date" | "end_date" | null;
}

const ExperienceStep = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { experience } = useSelector((state: RootState) => state.profileForm);
  const [datePickerState, setDatePickerState] = useState<DatePickerState>({
    isOpen: false,
    educationIndex: 0,
    dateType: null,
  });

  const { data: countryList } = useGetCountriesQuery({});
  const { data: cityList } = useGetCitiesQuery({});
  const { data: stateList } = useGetStatesQuery({});
  const { data: jobTitle } = useGetJobTitlesQuery({});
  const { data: companyNameList } = useGetCompanyNamesQuery({});

  function handleAddExperience() {
    dispatch({
      type: addExperience.type,
    });
  }

  function handleUpdateExperience(
    index: number,
    field: keyof Experience,
    value: string | boolean
  ) {
    dispatch({
      type: updateExperience.type,
      payload: { index, experience: { [field]: value } },
    });
  }

  const handleOpenDatePicker = (
    index: number,
    dateType: "start_date" | "end_date"
  ) => {
    setDatePickerState({
      isOpen: true,
      educationIndex: index,
      dateType,
    });
  };

  const handleDateConfirm = (date: Date) => {
    if (datePickerState.dateType && datePickerState.educationIndex >= 0) {
      const formattedDate = date.toISOString().split("T")[0];
      handleUpdateExperience(
        datePickerState.educationIndex,
        datePickerState.dateType,
        formattedDate
      );
    }
    setDatePickerState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <ScrollView className="flex-1">
        <View className="px-2">
          <View>
            <Text className="text-2xl font-bold">
              You almost done, now add your job experience if any 💼
            </Text>
            <Text className="text-gray-600 mt-2">
              Add any certifications/diplomas, extracurricular activities &
              skills.
            </Text>
          </View>

          <Button
            className="self-start border-employment mt-4"
            variant={"outline"}
            onPress={handleAddExperience}
          >
            <Text className="text-employment">+ Add Experience</Text>
          </Button>

          <View className="flex flex-col gap-4 mt-4">
            {experience?.map((exp, index) => (
              <Card key={index} className="p-4">
                <CardHeader className="flex flex-row justify-between items-center p-0">
                  <CardTitle className="text-base">
                    Experience {index + 1}
                  </CardTitle>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="w-fit"
                    onPress={() =>
                      dispatch({ type: removeExperience.type, payload: index })
                    }
                  >
                    <Trash className="text-red-500" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0 flex flex-col gap-4 mt-4">
                  <ExperienceForm
                    exp={exp}
                    index={index}
                    handleUpdateExperience={handleUpdateExperience}
                    onOpenDatePicker={handleOpenDatePicker}
                    jobTitleList={jobTitle}
                    companyNameList={companyNameList}
                    countryList={countryList}
                    cityList={cityList}
                    stateList={stateList}
                  />
                </CardContent>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>

      <DatePicker
        modal
        open={datePickerState.isOpen}
        date={new Date()}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() =>
          setDatePickerState((prev) => ({ ...prev, isOpen: false }))
        }
      />
    </>
  );
};

export default ExperienceStep;
