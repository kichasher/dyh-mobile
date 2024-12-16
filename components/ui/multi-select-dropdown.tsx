import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

type MultiSelectItem = {
  [key: string]: any;
};

interface Props<T extends MultiSelectItem> {
  data: T[];
  position?: "top" | "bottom" | "auto";
  onChangeValue: (values: any[]) => void;
  value?: any[];
  placeholder?: string;
  labelField?: keyof T;
  valueField?: keyof T;
  searchPlaceholder?: string;
  maxHeight?: number;
}

function MultiSelectComponent<T extends MultiSelectItem>({
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
  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    if (propValue) {
      setSelected(propValue);
    }
  }, [propValue]);

  const renderItem = (item: T) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item[labelField]}</Text>
      </View>
    );
  };

  // Fixed type definition for onChange handler
  const handleChange = (selectedItems: string[]) => {
    setSelected(selectedItems);
    onChangeValue(selectedItems);
  };

  const renderSelectedItem = (item: T, unSelect?: (item: T) => void) => (
    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
      <View style={styles.selectedStyle}>
        <Text style={styles.textSelectedStyle}>{item[labelField]}</Text>
        <AntDesign color="black" name="delete" size={17} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MultiSelect<T>
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField={labelField as string}
        valueField={valueField as string}
        placeholder={placeholder}
        value={propValue ?? selected}
        search
        searchPlaceholder={searchPlaceholder}
        onChange={handleChange}
        renderItem={renderItem}
        renderSelectedItem={renderSelectedItem}
        dropdownPosition={position}
        maxHeight={maxHeight}
      />
    </View>
  );
}

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { padding: 0 },
  dropdown: {
    height: 44,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});