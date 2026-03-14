import AppBar from '@/components/ui/app-bar'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: 'By downloading or using this app, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our app.',
  },
  {
    title: '2. Account Responsibility',
    body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately of any unauthorised use.',
  },
  {
    title: '3. Orders & Payments',
    body: 'All orders are subject to product availability. We reserve the right to refuse or cancel any order. Prices are displayed inclusive of applicable taxes and are subject to change without notice.',
  },
  {
    title: '4. Returns & Refunds',
    body: 'Items may be returned within 30 days of delivery in their original condition. Refunds are processed within 5–10 business days to the original payment method.',
  },
  {
    title: '5. Intellectual Property',
    body: 'All content in this app — including logos, images, and text — is owned by or licensed to us. You may not reproduce, distribute, or create derivative works without prior written consent.',
  },
  {
    title: '6. Limitation of Liability',
    body: 'We are not liable for indirect, incidental, or consequential damages arising from your use of the app. Our total liability shall not exceed the amount paid for the order in question.',
  },
  {
    title: '7. Changes to Terms',
    body: 'We reserve the right to update these terms at any time. Continued use of the app after changes constitutes acceptance of the revised terms. We will notify you of significant changes.',
  },
]

export default function TermsConditionsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppBar title="Terms & Conditions" showBackButton />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="document-text" size={40} color="#6366F1" />
          </View>
          <Text style={styles.heroTitle}>Usage Agreement</Text>
          <Text style={styles.heroSubtitle}>
            Please read these terms carefully before using our app. They govern your use of our
            services.
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
