import EmptyState from '@/components/ui/empty-state'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

const demoData = [
  {
    id: 'search',
    title: 'No results found',
    description: 'We couldn’t find anything matching your search. Try using different keywords.',
    icon: <Ionicons name="search-outline" size={26} color="#64748B" />,
  },
  {
    id: 'cart',
    title: 'Your cart is empty',
    description: 'Looks like you haven’t added anything yet.',
    ctaLabel: 'Shop now',
    icon: <Ionicons name="cart-outline" size={26} color="#64748B" />,
    onPress: () => Alert.alert('Go to shop'),
  },
]

const EmptyStateDemo = () => {
  return (
    <View style={styles.container}>
      {demoData.map((item) => (
        <View key={item.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{item.title}</Text>

          <EmptyState
            icon={item.icon}
            title={item.title}
            description={item.description}
            ctaLabel={item.ctaLabel}
            onCtaPress={item.onPress}
          />
        </View>
      ))}
    </View>
  )
}

export default EmptyStateDemo

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 40,
  },

  section: {
    gap: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
})
