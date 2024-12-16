import React, { useCallback, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  AppDispatch,
  removeEducation,
  RootState,
  updateEducation,
} from "@/feature";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "@/lib/icons";
import { Education } from "@/types/common-types";
import { EducationForm } from "../profile-form";
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetDegreeTypesQuery,
  useGetInstituteNamesQuery,
  useGetStatesQuery,
} from "@/feature/services/profileApi";
import DatePicker from "react-native-date-picker";
interface DatePickerState {
  isOpen: boolean;
  educationIndex: number;
  dateType: 'start_date' | 'end_date' | null;
}

const EducationStep = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { education } = useSelector((state: RootState) => state.profileForm);
  const [datePickerState, setDatePickerState] = useState<DatePickerState>({
    isOpen: false,
    educationIndex: 0,
    dateType: null,
  });

  // API queries
  const {data: degreeTypeList} = useGetDegreeTypesQuery({});
  const {data: instituteNameList } = useGetInstituteNamesQuery({});
  const {data: countryList } = useGetCountriesQuery({});
  const {data: cityList } = useGetCitiesQuery({});
  const {data:  stateList} = useGetStatesQuery({});

  const handleAddEducation = () => {
    dispatch({
      type: addEducation.type,
    });
  };

  const handleUpdateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    dispatch({
      type: updateEducation.type,
      payload: { index, education: { [field]: value } },
    });
  };

  const handleOpenDatePicker = (index: number, dateType: 'start_date' | 'end_date') => {
    setDatePickerState({
      isOpen: true,
      educationIndex: index,
      dateType,
    });
  };

  const handleDateConfirm = (date: Date) => {
    if (datePickerState.dateType && datePickerState.educationIndex >= 0) {
      const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      handleUpdateEducation(
        datePickerState.educationIndex,
        datePickerState.dateType,
        formattedDate
      );
    }
    setDatePickerState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <ScrollView className="flex-1">
        <View className="px-2">
          <View>
            <Text className="text-2xl font-bold">
              Great, now add your education information 🎓
            </Text>
            <Text className="text-gray-600 mt-2">
              Add any certifications/diplomas, extracurricular activities &
              skills.
            </Text>
          </View>

          <Button
            className="self-start border-education mt-4"
            variant={"outline"}
            onPress={handleAddEducation}
          >
            <Text className="text-education">+ Add Education</Text>
          </Button>

          <View className="flex flex-col gap-4 mt-4">
            {education?.map((edu, index) => (
              <Card key={index} className="p-4">
                <CardHeader className="flex flex-row justify-between items-center p-0">
                  <CardTitle className="text-base">
                    Education {index + 1}
                  </CardTitle>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="w-fit"
                    onPress={() =>
                      dispatch({ type: removeEducation.type, payload: index })
                    }
                  >
                    <Trash className="text-red-500" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0 flex flex-col gap-4 mt-4">
                  <EducationForm
                    edu={edu}
                    index={index}
                    handleUpdateEducation={handleUpdateEducation}
                    onOpenDatePicker={handleOpenDatePicker}
                    degreeTypeList={degreeTypeList}
                    instituteNameList={instituteNameList}
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
        onCancel={() => setDatePickerState(prev => ({ ...prev, isOpen: false }))}
      />
    </>
  );
};

export default EducationStep;
