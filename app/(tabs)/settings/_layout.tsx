import { Stack } from 'expo-router'

export default function SettingLayout() {
  return <Stack screenOptions={{ headerShown: false }} />
}

// import { Ionicons } from '@expo/vector-icons'
// import { Stack, useRouter } from 'expo-router'
// import { Pressable, StyleSheet } from 'react-native'

// export default function SettingLayout() {
//   const router = useRouter()

//   return (
//     <Stack
//       screenOptions={{
//         headerShown: true,
//         headerStyle: {
//           backgroundColor: '#1e293b',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: '600',
//           fontSize: 20,
//         },
//         headerTitleAlign: 'left',
//         headerShadowVisible: false,
//         headerLeft: ({ canGoBack }) =>
//           canGoBack ? (
//             <Pressable
//               style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
//               onPress={() => router.back()}
//             >
//               <Ionicons name="chevron-back" size={24} color="#fff" />
//             </Pressable>
//           ) : null,
//       }}
//     >
//       <Stack.Screen
//         name="index"
//         options={{
//           title: 'Settings',
//           headerLeft: () => null, // No back button on main settings screen
//         }}
//       />
//     </Stack>
//   )
// }

// const styles = StyleSheet.create({
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#334155',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 12,
//   },
//   backButtonPressed: {
//     opacity: 0.7,
//     backgroundColor: '#475569',
//   },
// })
// import { Stack } from 'expo-router'

// export default function SettingLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: true,
//         headerStyle: {
//           backgroundColor: '#1e293b',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: '600',
//           fontSize: 20,
//         },
//         headerTitleAlign: 'left',
//         headerShadowVisible: false,
//       }}
//     />
//   )
// }
