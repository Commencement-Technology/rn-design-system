import AppBar from '@/components/ui/app-bar'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide when creating an account, placing orders, or contacting support — including your name, email, shipping address, and payment details. We also collect usage data to improve your shopping experience.',
  },
  {
    title: '2. How We Use Your Data',
    body: 'Your data is used to process orders, send shipping updates, personalise product recommendations, and improve app performance. We do not sell your personal information to third parties.',
  },
  {
    title: '3. Data Storage & Security',
    body: 'All data is encrypted in transit and at rest using industry-standard protocols. Payment information is processed through certified payment gateways and is never stored on our servers.',
  },
  {
    title: '4. Cookies & Tracking',
    body: 'We use cookies to remember your preferences and keep you signed in. Analytics tools help us understand how the app is used so we can improve it. You can opt out of non-essential tracking in your device settings.',
  },
  {
    title: '5. Your Rights',
    body: 'You can request access to, correction of, or deletion of your personal data at any time by contacting our support team. We will respond within 30 days.',
  },
  {
    title: '6. Contact Us',
    body: 'If you have any questions about this Privacy Policy or how we handle your data, please reach out via the Feedback screen or email us at privacy@shopname.com.',
  },
]

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppBar title="Privacy Policy" showBackButton />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="shield-checkmark" size={40} color="#6366F1" />
          </View>
          <Text style={styles.heroTitle}>Your Privacy Matters</Text>
          <Text style={styles.heroSubtitle}>
            We are committed to protecting your personal data and being transparent about how we use
            it.
          </Text>
        </View>

        <View style={styles.lastUpdated}>
          <Ionicons name="time-outline" size={14} color="#94A3B8" />
          <Text style={styles.lastUpdatedText}>Last updated: January 2025</Text>
        </View>

        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}
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
    gap: 20,
    paddingBottom: 48,
  },
  hero: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 28,
    alignItems: 'center',
    gap: 12,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 21,
  },
  lastUpdated: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lastUpdatedText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.1,
  },
  sectionBody: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 23,
  },
})
