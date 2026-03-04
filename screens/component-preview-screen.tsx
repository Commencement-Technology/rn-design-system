import AppBar from '@/components/ui/app-bar'
import { DEMO_MAP } from '@/constants/demo-map'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ComponentPreview() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>()
  const DemoComponent = DEMO_MAP[id]

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppBar title={title} showBackButton titleAlign="center" />

      <View style={styles.content}>
        {DemoComponent ? (
          <DemoComponent />
        ) : (
          <View style={styles.notFound}>
            <Ionicons name="construct-outline" size={40} color="#CBD5E1" />
            <Text style={styles.notFoundTitle}>Demo not found</Text>
            <Text style={styles.notFoundSub}>
              Add <Text style={styles.code}>{id}</Text> to constants/demo-map.ts
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 32,
  },
  notFoundTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#94A3B8',
  },
  notFoundSub: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  code: {
    fontFamily: 'monospace',
    color: '#6366F1',
  },
})
