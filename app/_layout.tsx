import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F5F7F6' } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="demo/[id]" options={{ animation: 'slide_from_right' }} />
    </Stack>
  )
}
