import { BottomSheet } from '@/components/ui/bottom-sheet'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function BottomSheetDemo() {
  const [sheet1, setSheet1] = useState(false)
  const [sheet2, setSheet2] = useState(false)
  const [sheet3, setSheet3] = useState(false)

  return (
    <>
      <ScrollView contentContainerStyle={demoStyles.container}>
        <Text style={demoStyles.heading}>Bottom Sheet</Text>
        <Text style={demoStyles.desc}>Smooth spring animations • Drag to dismiss</Text>

        {[
          { label: 'Simple sheet (50%)', action: () => setSheet1(true) },
          { label: 'With subtitle (75%)', action: () => setSheet2(true) },
          { label: 'Tall sheet (90%)', action: () => setSheet3(true) },
        ].map((btn) => (
          <Pressable
            key={btn.label}
            style={({ pressed }) => [demoStyles.btn, pressed && demoStyles.btnPressed]}
            onPress={btn.action}
          >
            <Text style={demoStyles.btnText}>{btn.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Sheet 1 */}
      <BottomSheet
        visible={sheet1}
        onClose={() => setSheet1(false)}
        title="Quick Actions"
        snapPoints={['50%']}
      >
        {['Edit Profile', 'Share', 'Download', 'Report'].map((item) => (
          <Pressable key={item} style={demoStyles.listItem}>
            <Text style={demoStyles.listText}>{item}</Text>
          </Pressable>
        ))}
      </BottomSheet>

      {/* Sheet 2 */}
      <BottomSheet
        visible={sheet2}
        onClose={() => setSheet2(false)}
        title="Notifications"
        subtitle="Manage your notification preferences"
        snapPoints={['75%']}
      >
        <Text style={demoStyles.bodyText}>
          Configure which notifications you want to receive. Changes take effect immediately.
        </Text>
        {['Push Notifications', 'Email Alerts', 'SMS Updates', 'Weekly Digest', 'Marketing'].map(
          (item) => (
            <View key={item} style={demoStyles.listItem}>
              <Text style={demoStyles.listText}>{item}</Text>
            </View>
          ),
        )}
      </BottomSheet>

      {/* Sheet 3 */}
      <BottomSheet
        visible={sheet3}
        onClose={() => setSheet3(false)}
        title="Filter & Sort"
        subtitle="Refine your results"
        snapPoints={['90%']}
      >
        <Text style={demoStyles.bodyText}>
          Use the options below to filter and sort your content to match exactly what you're looking
          for.
        </Text>
        {Array.from({ length: 10 }, (_, i) => (
          <View key={i} style={demoStyles.listItem}>
            <Text style={demoStyles.listText}>Option {i + 1}</Text>
          </View>
        ))}
      </BottomSheet>
    </>
  )
}

const demoStyles = StyleSheet.create({
  container: { gap: 12 },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  btn: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  btnText: { color: '#FFF', fontWeight: '600', fontSize: 15 },
  listItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  listText: { fontSize: 15, color: '#1E293B', fontWeight: '500' },
  bodyText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 16,
  },
})
