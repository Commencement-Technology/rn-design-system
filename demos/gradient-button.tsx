import AppButton from '@/components/ui/button/gradient-button'
import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'

export default function GradientButtonDemo() {
  return (
    <View style={styles.wrapper}>
      {/* Default Blue Gradient */}
      <AppButton title="Continue" onPress={() => Alert.alert('Continue pressed')} />

      {/* Green Success Gradient */}
      <AppButton
        title="Submit"
        onPress={() => Alert.alert('Submit pressed')}
        gradientColors={['#16A34A', '#22C55E']}
      />

      {/* Orange CTA Gradient */}
      <AppButton
        title="Upgrade Plan"
        onPress={() => Alert.alert('Upgrade pressed')}
        gradientColors={['#EA580C', '#F97316']}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    marginTop: 40,
  },
})
