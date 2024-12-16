import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import DropDown from "@/components/ui/dropdown";
import { CalendarIcon } from "lucide-react-native";
import {
  City,
  Country,
  DegreeType,
  Education,
  InstitueNames,
  State,
} from "@/types/common-types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  edu: Education;
  index: number;
  handleUpdateEducation: (
    index: number,
    field: keyof Education,
    value: string
  ) => void;
  onOpenDatePicker: (
    index: number,
    dateType: "start_date" | "end_date"
  ) => void;
  degreeTypeList: DegreeType[];
  instituteNameList: InstitueNames[];
  countryList: Country[];
  cityList: City[];
  stateList: State[];
};

const EducationForm = ({
  edu,
  index,
  handleUpdateEducation,
  onOpenDatePicker,
  degreeTypeList,
  instituteNameList,
  countryList,
  cityList,
  stateList,
}: Props) => {
  return (
    <>
      <View>
        <Text className="mb-1 text-gray-500">Degree Type</Text>
        <DropDown
          value={edu?.degree_type}
          labelField={"name"}
          valueField={"id"}
          onChangeValue={(text) =>
            handleUpdateEducation(index, "degree_type", text)
          }
          data={degreeTypeList}
        />
      </View>
      <View>
        <Text className="mb-1 text-gray-500">Institue Name</Text>
        <DropDown
          value={edu?.institue_name}
          labelField={"name"}
          valueField={"id"}
          onChangeValue={(text) =>
            handleUpdateEducation(index, "institue_name", text)
          }
          data={instituteNameList}
        />
      </View>
      <View>
        <Text className="mb-2 text-gray-500">Degree Status</Text>
        <View className="">
          <RadioGroup
            value={edu?.degree_status}
            onValueChange={(value) =>
              handleUpdateEducation(index, "degree_status", value)
            }
            className="gap-3 flex flex-row items-center"
          >
            <RadioGroupItemWithLabel
              value="currently-enrolled"
              label={"Currently Enrolled"}
            />
            <RadioGroupItemWithLabel value="completed" label={"Completed"} />
          </RadioGroup>
        </View>
      </View>

      <View className="flex flex-row gap-2">
        <View className="flex-1">
          <Text className="mb-1 text-gray-500">Start Date</Text>
          <Pressable
            className="flex flex-row items-center justify-between p-3 border border-gray-200 rounded-md"
            onPress={() => onOpenDatePicker(index, "start_date")}
          >
            <Text className="text-gray-500">
              {edu?.start_date || "Select Date"}
            </Text>
            <CalendarIcon color="gray" size={20} />
          </Pressable>
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-gray-500">End Date</Text>
          <Pressable
            className="flex flex-row items-center justify-between p-3 border border-gray-200 rounded-md"
            onPress={() => onOpenDatePicker(index, "end_date")}
          >
            <Text className="text-gray-500">
              {edu?.end_date || "Select Date"}
            </Text>
            <CalendarIcon color="gray" size={20} />
          </Pressable>
        </View>
      </View>

      <View>
        <Text className="mb-1 text-gray-500 ">Country</Text>
        <DropDown
          value={edu?.country_id}
          labelField={"country"}
          valueField={"id"}
          onChangeValue={(text) =>
            handleUpdateEducation(index, "country_id", text)
          }
          data={countryList}
        />
      </View>

      <View>
        <Text className="mb-1 text-gray-500 ">State</Text>
        <DropDown
          value={edu?.state_id}
          labelField="state"
          valueField="id"
          onChangeValue={(text) =>
            handleUpdateEducation(index, "state_id", text)
          }
          data={stateList}
        />
      </View>

      <View>
        <Text className="mb-1 text-gray-500 ">City</Text>
        <DropDown
          value={edu?.city_id}
          labelField="city"
          valueField="id"
          onChangeValue={(text) =>
            handleUpdateEducation(index, "city_id", text)
          }
          data={cityList}
        />
      </View>
    </>
  );
};

export default EducationForm;

function RadioGroupItemWithLabel({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <View className={"flex-row gap-2 items-center"}>
      <RadioGroupItem
        style={{ width: 24, height: 24 }}
        aria-labelledby={`label-for-${value}`}
        value={value}
      />
      <Text nativeID={`label-for-${label}`}>{label}</Text>
    </View>
  );
}
