import React, { useCallback, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addCertificate,
  AppDispatch,
  removeCertificate,
  RootState,
  updateCerificate,
} from "@/feature";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "@/lib/icons";
import { Certificate } from "@/types/common-types";
import BottomSheetComp from "@/components/ui/bottom-sheet-modal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CertificateForm } from "../profile-form";
import { CertificateType } from "@/types/enums";
import DatePicker from "react-native-date-picker";
interface DatePickerState {
  isOpen: boolean;
  certificateIndex: number;
  dateType: "issue_date" | "expiration_date" | null;
}

const certificateTypes = [
  "Diploma",
  "Certificate",
  "Extra-curricular Activities",
  "Awards",
] as CertificateType[];

const CertificateStep = () => {
  const dispatch = useDispatch<AppDispatch>();
  const typeBottomSheetRef = useRef<BottomSheetModal>(null);
  const { certificates } = useSelector((state: RootState) => state.profileForm);
  console.log("🚀 ~ CertificateStep ~ certificates:", certificates)

  const [datePickerState, setDatePickerState] = useState<DatePickerState>({
    isOpen: false,
    certificateIndex: 0,
    dateType: null,
  });

  function handleAddCertificate(type: CertificateType) {
    dispatch({
      type: addCertificate.type,
      payload: { type },
    });

    typeBottomSheetRef.current?.dismiss();
  }

  function handleUpdateCertificate(
    index: number,
    field: keyof Certificate,
    value: string
  ) {
    dispatch({
      type: updateCerificate.type,
      payload: { index, certificate: { [field]: value } },
    });
  }

  const handleOpenDatePicker = (
    index: number,
    dateType: "issue_date" | "expiration_date"
  ) => {
    setDatePickerState({
      isOpen: true,
      certificateIndex: index,
      dateType,
    });
  };

  const handleDateConfirm = (date: Date) => {
    if (datePickerState.dateType && datePickerState.certificateIndex >= 0) {
      const formattedDate = date.toISOString().split("T")[0];
      handleUpdateCertificate(
        datePickerState.certificateIndex,
        datePickerState.dateType,
        formattedDate
      );
    }
    setDatePickerState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOpenTypeSelector = () => {
    typeBottomSheetRef.current?.present();
  };
  return (
    <>
      <ScrollView className="flex-1">
        <View className="px-2">
          <View>
            <Text className="text-2xl font-bold">
              Last step, add any additional information you have 📄
            </Text>
            <Text className="text-gray-600 mt-2">
              Add any certifications/diplomas, extracurricular activities &
              skills.
            </Text>
          </View>

          <Button
            className="self-start border-engagement mt-4"
            variant={"outline"}
            onPress={handleOpenTypeSelector}
          >
            <Text className="text-engagement">+ Add Additional Info</Text>
          </Button>

          <View className="flex flex-col gap-4 mt-4">
            {certificates?.map((cert, index) => (
              <Card key={index} className="p-4">
                <CardHeader className="flex flex-row justify-between items-center p-0">
                  <CardTitle className="text-base">
                    {cert?.type} {index + 1}
                  </CardTitle>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="w-fit"
                    onPress={() =>
                      dispatch({ type: removeCertificate.type, payload: index })
                    }
                  >
                    <Trash className="text-red-500" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0 flex flex-col gap-4 mt-4">
                  <CertificateForm
                    cert={cert}
                    index={index}
                    handleUpdateCertificate={handleUpdateCertificate}
                    onOpenDatePicker={handleOpenDatePicker}
                  />
                </CardContent>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom sheet for Certificate List */}
      <BottomSheetComp ref={typeBottomSheetRef}>
        <View className="p-4">
          <Text className="text-lg font-bold mb-4">Select Type</Text>
          <View className="gap-2">
            {certificateTypes.map((type) => (
              <Pressable
                key={type}
                className="p-4 border border-gray-200 rounded-md"
                onPress={() => handleAddCertificate(type)}
              >
                <Text className="text-base">{type}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </BottomSheetComp>

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

export default CertificateStep;
