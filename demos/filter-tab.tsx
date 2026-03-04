import Tab from '@/components/ui/tabs'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

const TABS = ['All', 'Active', 'Completed']

export default function FilterTabsDemo() {
  const [activeTab, setActiveTab] = useState('All')

  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <Tab key={tab} label={tab} active={activeTab === tab} onPress={() => setActiveTab(tab)} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
})
