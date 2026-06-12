import { Stack } from "expo-router";
import "../global.css"
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const properties = [
  {
    id: "1",
    title: "Modern Villa",
    city: "Mumbai",
    price: "₹1.2Cr",
  },
  {
    id: "2",
    title: "Sea View Flat",
    city: "Mumbai",
    price: "₹85L",
  },
  {
    id: "3",
    title: "Studio Loft",
    city: "Bangalore",
    price: "₹32L",
  },
];

export default function RootLayout() {
  return (
    <SafeAreaView className="bg-white p-10 flex-1">
      <View>
        {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
        <TextInput placeholder="Search City..." />
        <TouchableOpacity onPress={() => alert("Searching!")}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={properties} keyExtractor={(item)=>item.id} 
        renderItem={({item})=>(
          <View>
            <Text >{item.title}</Text>
            <Text >{item.city}</Text>
            <Text >{item.price}</Text>
          </View>
        )}/>
    </SafeAreaView>
  );
}
