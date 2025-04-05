import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const Searchbar = ({ placeholder, onPress }: Props) => {

  return (
    <View className="flex-row items-center rounded-full bg-dark-200  px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor={"#a8b5db"}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default Searchbar;
