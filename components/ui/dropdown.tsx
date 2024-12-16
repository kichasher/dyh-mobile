import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

type DropdownItem = {
  [key: string]: any;
};

interface Props<T extends DropdownItem> {
  data: T[];
  position?: "top" | "bottom" | "auto";
  onChangeValue: (value: any) => void;
  value?: any;
  placeholder?: string;
  labelField?: keyof T;
  valueField?: keyof T;
  searchPlaceholder?: string;
  maxHeight?: number;
}

function DropDown<T extends DropdownItem>({
  data,
  position = "auto",
  onChangeValue,
  value: propValue,
  placeholder = "Select",
  labelField = "label",
  valueField = "value",
  searchPlaceholder = "Search...",
  maxHeight = 300,
}: Props<T>) {
  const [localValue, setLocalValue] = useState<any>(null);

  const renderItem = (item: T) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item[labelField]}</Text>
      </View>
    );
  };

  const handleChange = (item: T) => {
    setLocalValue(item[valueField]);
    onChangeValue(item[valueField]);
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      // search
      // searchPlaceholder={searchPlaceholder}
      data={data}
      dropdownPosition={position}
      maxHeight={maxHeight}
      labelField={labelField as string}
      valueField={valueField as string}
      placeholder={placeholder}
      value={propValue ?? localValue}
      onChange={handleChange}
      renderItem={renderItem}
    />
  );
}

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: 44,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
