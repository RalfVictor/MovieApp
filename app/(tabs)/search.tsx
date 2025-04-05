import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import useFetch from "@/Services/useFetch";
import { fetchMovies } from "@/Services/api";
import Moviecard from "@/components/Moviecard";
import { icons } from "@/constants/icons";
import Searchbar from "@/components/Searchbar";
import { useRouter } from "expo-router";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
  );

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <Moviecard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 mb-10 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="mb-5">
              <Searchbar
                placeholder="Search Movies.."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error:{error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-[15px] text-white font-bold">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500 font-bold">
                {searchQuery.trim() ? "No Movies Found" : "Search for a Movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default search;
