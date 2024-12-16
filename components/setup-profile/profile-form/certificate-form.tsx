import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Certificate } from "@/types/common-types";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react-native";
type DateType = "issue_date" | "expiration_date";

type Props = {
  cert: Certificate;
  index: number;
  handleUpdateCertificate: (
    index: number,
    field: keyof Certificate,
    value: string
  ) => void;
  onOpenDatePicker: (index: number, dateType: DateType) => void;
};

const CertificateForm = ({
  cert,
  index,
  handleUpdateCertificate,
  onOpenDatePicker,
}: Props) => {
  return (
    <>
      <View>
        <Text className="mb-1 text-gray-500 ">Name</Text>
        <Input
          placeholder="Enter Name"
          value={cert?.name}
          onChangeText={(text) => handleUpdateCertificate(index, "name", text)}
          className="native:text-base"
        />
      </View>
      <View>
        <Text className="mb-1 text-gray-500 ">Certificate ID</Text>
        <Input
          placeholder="Enter Certificate ID"
          value={cert?.certificate_id}
          onChangeText={(text) =>
            handleUpdateCertificate(index, "certificate_id", text)
          }
          className="native:text-base"
        />
      </View>

      <View className="flex flex-row gap-2">
        <View className="flex-1">
          <Text className="mb-1 text-gray-500">Issue Date</Text>
          <Pressable
            className="flex flex-row items-center justify-between p-3 border border-gray-200 rounded-md"
            onPress={() => onOpenDatePicker(index, "issue_date")}
          >
            <Text className="text-gray-500">
              {cert?.issue_date || "Select Date"}
            </Text>
            <CalendarIcon color="gray" size={20} />
          </Pressable>
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-gray-500">Expiry Date</Text>
          <Pressable
            className="flex flex-row items-center justify-between p-3 border border-gray-200 rounded-md"
            onPress={() => onOpenDatePicker(index, "expiration_date")}
          >
            <Text className="text-gray-500">
              {cert?.expiration_date || "Select Date"}
            </Text>
            <CalendarIcon color="gray" size={20} />
          </Pressable>
        </View>
      </View>
      <View>
        <Text className="mb-1 text-gray-500 ">Certificate URL (optional)</Text>
        <Input
          placeholder="Enter Certificate ID"
          value={cert?.certificate_url}
          onChangeText={(text) =>
            handleUpdateCertificate(index, "certificate_url", text)
          }
          className="native:text-base"
        />
      </View>
    </>
  );
};

export default CertificateForm;
