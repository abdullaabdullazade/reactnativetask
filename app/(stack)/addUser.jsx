import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, {  useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { addUser, updateUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { router, useLocalSearchParams } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

const addUser_ = () => {
  let { update, item } = useLocalSearchParams();
  if (item) item = JSON.parse(item);
  const [name, setName] = useState(update ? item.name : "");
  const [role, setRole] = useState(update ? item.role : "");
  const [status, setStatus] = useState(update ? item.status : "offline");

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Online", value: "online" },
    { label: "Offline", value: "offline" },
  ]);

  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <View className="p-5">
        <Text className="my-6 text-xl ">User Name</Text>
        <TextInput
          className="h-12 border-gray-400 border pl-2"
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
        <Text className="my-3 text-xl">Role</Text>
        <TextInput
          className="h-12 border-gray-400 border pl-2 mb-5"
          placeholder="Enter role"
          value={role}
          onChangeText={setRole}
        />
        <DropDownPicker
          open={open}
          value={status}
          items={items}
          setOpen={setOpen}
          setValue={setStatus}
          setItems={setItems}
        />
      </View>
      <TouchableOpacity
        className="border border-blue-500 m-2 h-12 rounded-full bg-blue-400 items-center justify-center "
        onPress={() => {
          if (update) {
            dispatch(
              updateUser({
                id: item.id,
                name: name,
                role: role,
                status: status,
              })
            );
          } else {
            dispatch(
              addUser({
                name: name,
                role: role,
                dataCreated: new Date().toLocaleDateString("en-GB").toString(),

                status: status,
              })
            );
          }
          router.back();
        }}
      >
        <Text className="text-white font-bold text-2xl">
          {update ? "Update" : "Add"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default addUser_;
