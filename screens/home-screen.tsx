import ComponentCard from '@/components/component-card'
import SearchBar from '@/components/ui/search-bar'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  CATEGORIES,
  COMPONENT_REGISTRY,
  ComponentCategory,
  ComponentMeta,
} from '../constants/component-registry'

const COLUMN_COUNT = 2
const SCREEN_WIDTH = Dimensions.get('window').width
const HORIZONTAL_PADDING = 20
const COLUMN_GAP = 10
const CARD_WIDTH =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - COLUMN_GAP * (COLUMN_COUNT - 1)) / COLUMN_COUNT

const HomeScreen = () => {
  const [query, setQuery] = useState('')

  const filtered = COMPONENT_REGISTRY.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()),
  )

  const grouped = CATEGORIES.reduce<Record<ComponentCategory, ComponentMeta[]>>(
    (acc, cat) => {
      acc[cat] = filtered.filter((c) => c.category === cat)
      return acc
    },
    {} as Record<ComponentCategory, ComponentMeta[]>,
  )

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Design System</Text>
            <Text style={styles.heading}>Components</Text>
          </View>
        </View>

        <SearchBar value={query} onChangeText={setQuery} placeholder="Search components..." />

        {filtered.length === 0 && (
          <View style={styles.noResults}>
            <Ionicons name="search-outline" size={32} color="#CBD5E1" />
            <Text style={styles.noResultsTitle}>No components found</Text>
            <Text style={styles.noResultsSub}>Try a different search term</Text>
          </View>
        )}

        {CATEGORIES.map((category) => {
          const items = grouped[category]
          if (!items || items.length === 0) return null

          const rows: ComponentMeta[][] = []
          for (let i = 0; i < items.length; i += COLUMN_COUNT) {
            rows.push(items.slice(i, i + COLUMN_COUNT))
          }

          return (
            <View key={category} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{category}</Text>
                <View style={styles.sectionCountBadge}>
                  <Text style={styles.sectionCount}>{items.length}</Text>
                </View>
              </View>

              <View style={styles.grid}>
                {rows.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.gridRow}>
                    {row.map((component) => (
                      <ComponentCard
                        key={component.id}
                        component={component}
                        cardWidth={CARD_WIDTH}
                        onPress={() =>
                          router.push({
                            pathname: '/demo/[id]',
                            params: { id: component.id, title: component.title },
                          })
                        }
                      />
                    ))}
                    {row.length < COLUMN_COUNT &&
                      Array.from({ length: COLUMN_COUNT - row.length }).map((_, i) => (
                        <View key={`empty-${i}`} style={{ width: CARD_WIDTH }} />
                      ))}
                  </View>
                ))}
              </View>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: HORIZONTAL_PADDING,
    gap: 24,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6366F1',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.8,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionCountBadge: {
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  grid: {
    gap: COLUMN_GAP,
  },
  gridRow: {
    flexDirection: 'row',
    gap: COLUMN_GAP,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  noResultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94A3B8',
  },
  noResultsSub: {
    fontSize: 13,
    color: '#CBD5E1',
  },
})
