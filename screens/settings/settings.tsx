import AppBar from '@/components/ui/app-bar'
import Toggle from '@/components/ui/toggle'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SettingsScreen() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [promotions, setPromotions] = useState(false)

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppBar title="Settings" showBackButton />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Section title="Account">
          <SettingRow
            icon="person-outline"
            title="Edit Profile"
            subtitle="Update your name, email and photo"
            chevron
          />
          <Divider />
          <SettingRow
            icon="lock-closed-outline"
            title="Change Password"
            subtitle="Keep your account secure"
            onPress={() => {}}
            chevron
          />
          <Divider />
          <SettingRow
            icon="card-outline"
            title="Payment Methods"
            subtitle="Manage cards and wallets"
            onPress={() => {}}
            chevron
          />
          <Divider />
          <SettingRow
            icon="location-outline"
            title="Saved Addresses"
            subtitle="Home, work and other locations"
            onPress={() => {}}
            chevron
          />
        </Section>

        <Section title="Notifications">
          <SettingRow
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Alerts for activity on your account"
            right={<Toggle value={notifications} onValueChange={setNotifications} size="sm" />}
          />
          <Divider />
          <SettingRow
            icon="cube-outline"
            title="Order Updates"
            subtitle="Shipping and delivery status"
            right={<Toggle value={orderUpdates} onValueChange={setOrderUpdates} size="sm" />}
          />
          <Divider />
          <SettingRow
            icon="pricetag-outline"
            title="Promotions & Offers"
            subtitle="Deals, discounts and new arrivals"
            right={<Toggle value={promotions} onValueChange={setPromotions} size="sm" />}
          />
        </Section>

        <Section title="Support">
          <SettingRow
            icon="chatbubble-outline"
            title="Send Feedback"
            subtitle="Help us improve the app"
            onPress={() => router.push('/settings/feedback')}
            chevron
          />
          <Divider />
          <SettingRow
            icon="star-outline"
            title="Rate the App"
            subtitle="Share your experience on the store"
            onPress={() => {}}
            chevron
          />
          <Divider />
          <SettingRow
            icon="share-social-outline"
            title="Share with Friends"
            subtitle="Invite others and earn rewards"
            onPress={() => {}}
            chevron
          />
        </Section>

        <Section title="Legal">
          <SettingRow
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            subtitle="How we handle your data"
            onPress={() => router.push('/settings/privacy-policy')}
            chevron
          />
          <Divider />
          <SettingRow
            icon="document-text-outline"
            title="Terms & Conditions"
            subtitle="Usage agreement"
            onPress={() => router.push('/settings/terms-conditions')}
            chevron
          />
        </Section>

        <Section title="About">
          <SettingRow
            icon="information-circle-outline"
            title="About App"
            subtitle="Version info and company details"
            onPress={() => router.push('/settings/about-app')}
            chevron
          />
          <Divider />
          <SettingRow
            icon="apps-outline"
            title="App Version"
            right={<Text style={styles.version}>v1.0.0</Text>}
          />
        </Section>

        <Section title="Account Actions">
          <SettingRow icon="log-out-outline" title="Log Out" onPress={() => {}} chevron danger />
          <Divider />
          <SettingRow
            icon="trash-outline"
            title="Delete Account"
            subtitle="Permanently remove your account"
            onPress={() => {}}
            chevron
            danger
          />
        </Section>

        <Text style={styles.footer}>Made with ❤️ for great shopping experiences</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  )
}

function SettingRow({
  icon,
  title,
  subtitle,
  right,
  chevron,
  danger,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap
  title: string
  subtitle?: string
  right?: React.ReactNode
  chevron?: boolean
  danger?: boolean
  onPress?: () => void
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && onPress && styles.rowPressed]}
      onPress={onPress}
    >
      <View style={[styles.iconWrap, danger && styles.iconWrapDanger]}>
        <Ionicons name={icon} size={18} color={danger ? '#EF4444' : '#6366F1'} />
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, danger && styles.rowTitleDanger]}>{title}</Text>
        {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
      </View>
      {right}
      {chevron && <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />}
    </Pressable>
  )
}

function Divider() {
  return <View style={styles.divider} />
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 20,
    gap: 4,
    paddingBottom: 48,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 14,
    gap: 12,
  },
  rowPressed: {
    backgroundColor: '#F8FAFC',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconWrapDanger: {
    backgroundColor: '#FEF2F2',
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E293B',
  },
  rowTitleDanger: {
    color: '#EF4444',
  },
  rowSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 62,
  },
  version: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6366F1',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 4,
    paddingBottom: 16,
  },
})
