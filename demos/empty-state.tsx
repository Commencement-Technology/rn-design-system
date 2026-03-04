import EmptyState from '@/components/ui/empty-state'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function EmptyStateDemo() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Empty State</Text>
      <Text style={styles.description}>Fade + spring entrance animation</Text>

      <View style={styles.card}>
        <EmptyState
          icon="search-outline"
          title="No results found"
          description="We couldn't find anything matching your search. Try using different keywords or filters."
          cta={{ label: 'Clear search', onPress: () => {} }}
          secondaryCta={{ label: 'Browse all', onPress: () => {} }}
        />
      </View>

      <View style={styles.card}>
        <EmptyState
          icon="mail-outline"
          title="Your inbox is empty"
          description="When you receive messages, they'll appear here. Start a conversation to get things going."
          cta={{ label: 'New message', onPress: () => {} }}
        />
      </View>

      <View style={styles.card}>
        <EmptyState
          icon="notifications-outline"
          title="All caught up!"
          description="You have no new notifications. We'll let you know when something comes in."
        />
      </View>

      <View style={styles.card}>
        <EmptyState
          illustration={
            <View style={styles.emoji}>
              <Text style={styles.emojiText}>📦</Text>
            </View>
          }
          title="Nothing in your cart"
          description="Looks like you haven't added anything yet. Explore our catalog and find something you love."
          cta={{ label: 'Start shopping', onPress: () => {} }}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  emoji: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  emojiText: {
    fontSize: 44,
  },
})
