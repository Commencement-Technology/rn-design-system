import AppBar from '@/components/ui/app-bar'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const BRAND = '#6366F1'

const STATS = [
  { value: '50K+', label: 'Customers' },
  { value: '10K+', label: 'Products' },
  { value: '4.9', label: 'Rating' },
]

const LINKS = [
  {
    icon: 'globe-outline' as const,
    label: 'Website',
    value: 'shopname.com',
    url: 'https://shopname.com',
  },
  {
    icon: 'logo-instagram' as const,
    label: 'Instagram',
    value: '@shopname',
    url: 'https://instagram.com',
  },
  {
    icon: 'mail-outline' as const,
    label: 'Support',
    value: 'hello@shopname.com',
    url: 'mailto:hello@shopname.com',
  },
]

export default function AboutAppScreen() {
  const openLink = (url: string) => Linking.openURL(url).catch(console.error)

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppBar title="About" showBackButton />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.appIcon}>
            <Ionicons name="bag-handle" size={40} color={BRAND} />
          </View>
          <Text style={styles.appName}>ShopName</Text>
          <Text style={styles.appTagline}>
            Discover and shop the latest trends delivered straight to your door.
          </Text>
        </View>

        <View style={styles.statsRow}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.missionCard}>
          <View style={styles.missionHeader}>
            <Ionicons name="rocket-outline" size={16} color={BRAND} />
            <Text style={styles.missionLabel}>Our Mission</Text>
          </View>
          <Text style={styles.missionText}>
            We believe great products should be accessible to everyone. ShopName curates quality
            items from trusted sellers around the world, making it easy to find exactly what you
            need at a price that works for you.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Connect With Us</Text>
        {LINKS.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => openLink(item.url)}
            style={({ pressed }) => [styles.linkRow, pressed && styles.linkRowPressed]}
          >
            <View style={styles.linkLeft}>
              <View style={styles.linkIcon}>
                <Ionicons name={item.icon} size={20} color="#475569" />
              </View>
              <Text style={styles.linkLabel}>{item.label}</Text>
            </View>
            <Text style={styles.linkValue}>{item.value}</Text>
          </Pressable>
        ))}

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Made with </Text>
            <Ionicons name="heart" size={13} color="#EF4444" />
            <Text style={styles.footerText}> for great shopping</Text>
          </View>
          <Text style={styles.copyright}>© 2025 ShopName. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 20,
    paddingBottom: 48,
    gap: 20,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  appIcon: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    paddingVertical: 16,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  missionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 18,
    gap: 10,
  },
  missionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  missionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: BRAND,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  missionText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: -8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  linkRowPressed: {
    opacity: 0.7,
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  linkValue: {
    fontSize: 13,
    color: BRAND,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#CBD5E1',
  },
  copyright: {
    fontSize: 12,
    color: '#CBD5E1',
  },
})
