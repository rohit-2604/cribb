import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/expo'
import { useRouter } from 'expo-router'

export default function ProfileScreen() {
  const router = useRouter()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/(auth)/sign-in')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <SafeAreaView className="flex-1 px-5 bg-white">
      <View className="mt-6">
        <Text className="text-xl font-semibold mb-6">
          Profile Screen
        </Text>

        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-500 py-3 rounded-lg items-center"
        >
          <Text className="text-white font-semibold">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}