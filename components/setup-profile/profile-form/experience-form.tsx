import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  City,
  CompanyName,
  Country,
  Experience,
  JobTitle,
  State,
} from "@/types/common-types";
import DropDown from "@/components/ui/dropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react-native";

type Props = {
  exp: Experience;
  index: number;
  handleUpdateExperience: (
    index: number,
    field: keyof Experience,
    value: string | boolean
  ) => void;
  onOpenDatePicker: (
    index: number,
    dateType: "start_date" | "end_date"
  ) => void;
  jobTitleList: JobTitle[];
  companyNameList: CompanyName[];
  countryList: Country[];
  cityList: City[];
  stateList: State[];
};

const ExperienceForm = ({
  exp,
  index,
  handleUpdateExperience,
  onOpenDatePicker,
  jobTitleList,
  companyNameList,
  countryList,
  cityList,
  stateList,
}: Props) => {
  return (
    <>
      <View>
        <Text className="mb-1 text-gray-500">Job Title</Text>
        <DropDown
          value={exp?.job_title}
          labelField="name"
          valueField="id"
          onChangeValue={(text) =>
            handleUpdateExperience(index, "job_title", text)
          }
          data={jobTitleList}
        />
      </View>
      <View>
        <Text className="mb-1 text-gray-500">Company Name</Text>
        <DropDown
          value={exp?.company_name}
          labelField="name"
          valueField="id"
          onChangeValue={(text) =>
            handleUpdateExperience(index, "company_name", text)
          }
          data={companyNameList}
        />
      </View>
      <View>
        <Text className="mb-1 text-gray-500">Job Status</Text>
        <View className="flex flex-row gap-4 mt-1 items-center">
          <Checkbox
            checked={exp?.job_status}
            onCheckedChange={(checked) => {
              handleUpdateExperience(index, "job_status", checked);
            }}
          />
          <Text className="text-lg">Currently Working</Text>
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
              {exp?.start_date || "Select Date"}
            </Text>
            <CalendarIcon color="gray" size={20} />
          </Pressable>
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-gray-500">End Date</Text>
          <Pressable
            className="flex flex-row items-center justify-between p-3 border border-gray-200 rounded-md"
            onPress={() => onOpenDatePicker(index, "end_date")}
            disabled={!exp?.start_date || exp?.job_status}
            style={{
              opacity: !exp?.start_date || !exp?.job_status ? 1 : 0.5,
            }}
          >
            <Text className="text-gray-500">
              {exp?.end_date || "Select Date"}
            </Text>
            <CalendarIcon color="gray" size={20} />
          </Pressable>
        </View>
      </View>

      <View>
        <Text className="mb-1 text-gray-500 ">Country</Text>
        <DropDown
          value={exp?.country_id}
          labelField="country"
          valueField="id"
          onChangeValue={(text) =>
            handleUpdateExperience(index, "country_id", text)
          }
          data={countryList}
        />
      </View>

      <View>
        <Text className="mb-1 text-gray-500 ">State</Text>
        <DropDown
          value={exp?.state_id}
          labelField="state"
          valueField="id"
          onChangeValue={(text) =>
            handleUpdateExperience(index, "state_id", text)
          }
          data={stateList}
        />
      </View>

      <View>
        <Text className="mb-1 text-gray-500 ">City</Text>
        <DropDown
          value={exp?.city_id}
          labelField="city"
          valueField="id"
          onChangeValue={(text) =>
            handleUpdateExperience(index, "city_id", text)
          }
          data={cityList}
        />
      </View>
    </>
  );
};

export default ExperienceForm;

const styles = StyleSheet.create({});
