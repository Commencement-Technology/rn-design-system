import Toggle from '@/components/ui/toggle'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function ToggleDemo() {
  const [notifications, setNotifications] = useState(true)
  const [orderUpdates, setOrderUpdates] = useState(false)
  const [sm, setSm] = useState(false)
  const [md, setMd] = useState(true)
  const [lg, setLg] = useState(false)
  const [teal, setTeal] = useState(true)
  const [rose, setRose] = useState(false)

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.label}>Default</Text>
      <View style={styles.card}>
        <Toggle
          label="Push Notifications"
          description="Receive alerts for new activity"
          value={notifications}
          onValueChange={setNotifications}
        />
        <View style={styles.divider} />
        <Toggle
          label="Order Updates"
          description="Shipping and delivery status"
          value={orderUpdates}
          onValueChange={setOrderUpdates}
        />
      </View>

      <Text style={styles.label}>Sizes</Text>
      <View style={styles.card}>
        <Toggle label="Small" size="sm" value={sm} onValueChange={setSm} />
        <View style={styles.divider} />
        <Toggle label="Medium" size="md" value={md} onValueChange={setMd} />
        <View style={styles.divider} />
        <Toggle label="Large" size="lg" value={lg} onValueChange={setLg} />
      </View>

      <Text style={styles.label}>Custom Colors</Text>
      <View style={styles.card}>
        <Toggle label="Teal" value={teal} onValueChange={setTeal} activeColor="#14B8A6" />
        <View style={styles.divider} />
        <Toggle label="Rose" value={rose} onValueChange={setRose} activeColor="#F43F5E" />
      </View>

      <Text style={styles.label}>Disabled</Text>
      <View style={styles.card}>
        <Toggle label="Disabled — On" value={true} onValueChange={() => {}} disabled />
        <View style={styles.divider} />
        <Toggle label="Disabled — Off" value={false} onValueChange={() => {}} disabled />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: 48,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 16,
    gap: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
})
