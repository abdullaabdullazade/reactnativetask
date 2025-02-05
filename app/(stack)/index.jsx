import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import AntDesign from "@expo/vector-icons/AntDesign";
import { addUser, deleteUser, updateUser, datas } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import { router, useFocusEffect } from "expo-router";
const RenderUsers = ({ item }) => {
  if (!item) {
    return null;
  }
  const dispatch = useDispatch();

  return (
    <View className="flex-row border-b border-gray-500">
      <View className="w-48 flex-row items-center px-4 py-2 bg-gray-100">
        <Text className="w-16 font-bold">{item.id}</Text>
        <Text className="w-32">{item.name}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row  px-4 py-2  items-center ">
          <Text className="w-48 text-center">{item.dataCreated}</Text>
          <Text className="w-24 text-center">{item.role}</Text>
          <Text className="w-24 text-center">{item.status}</Text>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "./addUser",
                params: { update: true, item: JSON.stringify(item) },
              });
            }}
          >
            <Feather name="settings" size={24} color="blue" className="mx-3" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(deleteUser({ id: item.id }));
            }}
          >
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const index = () => {
  let datas_ = useSelector(datas);

  return (
    <SafeAreaView className="ml-2">
      <View className="bg-blue-500 h-20  rounded-lg flex flex-row justify-between items-center ">
        <Text className="text-xl pl-2 text-white font-bold">
          User Management
        </Text>
        <TouchableOpacity
          className="flex flex-row gap-2 mr-2 bg-white p-2 rounded-3xl items-center"
          onPress={() => router.push("./addUser")}
        >
          <AntDesign name="pluscircle" size={24} color="gray" />
          <Text className="text-gray-400">Add new user</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row border-b border-gray-500">
        <View className="w-48 flex-row px-4 py-2 bg-gray-100">
          <Text className="w-16 font-bold text-2xl">#</Text>
          <Text className="w-32 font-bold text-2xl">Name</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row px-4 py-2">
            <Text className="w-48 font-bold text-2xl text-center">
              Data Created
            </Text>
            <Text className="w-24 font-bold text-2xl text-center">Role</Text>
            <Text className="w-24 font-bold text-2xl text-center">Status</Text>
            <Text className="w-24 font-bold text-2xl text-center">Action</Text>
          </View>
        </ScrollView>
      </View>
      <FlatList
        data={datas_}
        renderItem={({ item }) => (
          <RenderUsers item={item} key={({ item }) => item.id} />
        )}
      />
    </SafeAreaView>
  );
};

export default index;
