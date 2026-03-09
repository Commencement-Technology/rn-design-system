import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import Avatar from '../components/ui/avatar'
import BottomSheet from '../components/ui/bottom-sheet'
import Button from '../components/ui/button/button'
import Card from '../components/ui/card/card'
import IconWrapper from '../components/ui/icon-wrapper'

type SheetKey = 'filter' | 'profile' | 'confirm' | null

function TriggerCard({
  label,
  description,
  iconName,
  iconColor,
  iconBg,
  onPress,
}: {
  label: string
  description: string
  iconName: React.ComponentProps<typeof Ionicons>['name']
  iconColor: string
  iconBg: string
  onPress: () => void
}) {
  return (
    <Card variant="outlined" padding="medium" onPress={onPress} style={s.fullWidth}>
      <View style={s.triggerRow}>
        <IconWrapper
          name={iconName}
          size="md"
          color={iconColor}
          backgroundColor={iconBg}
          borderRadius={12}
        />
        <View style={s.flex}>
          <Text style={s.triggerLabel}>{label}</Text>
          <Text style={s.triggerDesc}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
      </View>
    </Card>
  )
}

export default function BottomSheetDemo() {
  const [open, setOpen] = useState<SheetKey>(null)
  const [selectedSort, setSelectedSort] = useState('newest')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const close = () => setOpen(null)

  return (
    <>
      <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
        <View style={s.pageHeader}>
          <Text style={s.pageTitle}>Bottom Sheet</Text>
          <Text style={s.pageSubtitle}>Modal surfaces that slide up from the bottom</Text>
        </View>

        <Text style={s.sectionLabel}>Tap to open</Text>
        <View style={s.cards}>
          <TriggerCard
            label="Filter & Sort"
            description="Toggles, radio options, apply action"
            iconName="options-outline"
            iconColor="#6366F1"
            iconBg="#EEF2FF"
            onPress={() => setOpen('filter')}
          />
          <TriggerCard
            label="User Profile"
            description="Avatar, stats, and contact actions"
            iconName="person-outline"
            iconColor="#10B981"
            iconBg="#DCFCE7"
            onPress={() => setOpen('profile')}
          />
          <TriggerCard
            label="Confirm Delete"
            description="Destructive action with cancel"
            iconName="trash-outline"
            iconColor="#EF4444"
            iconBg="#FEF2F2"
            onPress={() => setOpen('confirm')}
          />
        </View>
      </ScrollView>

      {/* ── Filter & Sort ── */}
      <BottomSheet visible={open === 'filter'} onClose={close} title="Filter & Sort" height="lg">
        <ScrollView contentContainerStyle={s.sheetBody} showsVerticalScrollIndicator={false}>
          <Text style={s.groupLabel}>Sort By</Text>
          {[
            { key: 'newest', label: 'Newest First' },
            { key: 'oldest', label: 'Oldest First' },
            { key: 'price_asc', label: 'Price: Low to High' },
            { key: 'price_desc', label: 'Price: High to Low' },
          ].map((opt) => (
            <Pressable
              key={opt.key}
              onPress={() => setSelectedSort(opt.key)}
              style={({ pressed }) => [
                s.radioRow,
                selectedSort === opt.key && s.radioRowActive,
                pressed && s.radioRowPressed,
              ]}
            >
              <Text style={[s.radioLabel, selectedSort === opt.key && s.radioLabelActive]}>
                {opt.label}
              </Text>
              <View style={[s.radioCircle, selectedSort === opt.key && s.radioCircleActive]}>
                {selectedSort === opt.key && <View style={s.radioInner} />}
              </View>
            </Pressable>
          ))}

          <View style={s.divider} />

          <View style={s.toggleRow}>
            <View>
              <Text style={s.toggleLabel}>Available only</Text>
              <Text style={s.toggleSub}>Hide out-of-stock items</Text>
            </View>
            <Switch
              value={onlyAvailable}
              onValueChange={setOnlyAvailable}
              trackColor={{ true: '#6366F1', false: '#E2E8F0' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <Button title="Apply Filters" onPress={close} variant="primary" style={s.btn} />
        </ScrollView>
      </BottomSheet>

      {/* ── User Profile ── */}
      <BottomSheet visible={open === 'profile'} onClose={close} title="Profile" height="md">
        <ScrollView contentContainerStyle={s.sheetBody} showsVerticalScrollIndicator={false}>
          <View style={s.profileHeader}>
            <Avatar
              uri="https://i.pravatar.cc/150?img=33"
              name="Jordan Wells"
              size="xl"
              variant="circle"
            />
            <View style={s.flex}>
              <Text style={s.profileName}>Jordan Wells</Text>
              <Text style={s.profileRole}>Senior Engineer · Remote</Text>
            </View>
          </View>

          <View style={s.statsRow}>
            {[
              { value: '248', label: 'Posts' },
              { value: '6.1k', label: 'Followers' },
              { value: '180', label: 'Following' },
            ].map((stat) => (
              <View key={stat.label} style={s.stat}>
                <Text style={s.statValue}>{stat.value}</Text>
                <Text style={s.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <View style={s.divider} />

          {[
            {
              icon: 'mail-outline' as const,
              label: 'Send Message',
              color: '#6366F1',
              bg: '#EEF2FF',
            },
            { icon: 'call-outline' as const, label: 'Call', color: '#10B981', bg: '#DCFCE7' },
          ].map((action) => (
            <Pressable
              key={action.label}
              onPress={close}
              style={({ pressed }) => [s.actionRow, pressed && s.actionRowPressed]}
            >
              <IconWrapper
                name={action.icon}
                size="sm"
                color={action.color}
                backgroundColor={action.bg}
                borderRadius={8}
              />
              <Text style={s.actionLabel}>{action.label}</Text>
              <Ionicons name="chevron-forward" size={15} color="#CBD5E1" />
            </Pressable>
          ))}
        </ScrollView>
      </BottomSheet>

      {/* ── Confirm Delete ── */}
      <BottomSheet visible={open === 'confirm'} onClose={close} title="Delete Post" height="md">
        <View style={s.sheetBody}>
          <View style={s.confirmIconWrap}>
            <IconWrapper
              name="trash-outline"
              size="lg"
              color="#EF4444"
              backgroundColor="#FEF2F2"
              borderRadius={99}
            />
          </View>
          <Text style={s.confirmTitle}>Are you sure?</Text>
          <Text style={s.confirmBody}>
            This will permanently delete your post and all comments. This cannot be undone.
          </Text>
          <Button
            title="Yes, Delete"
            onPress={close}
            variant="secondary"
            style={[s.btn, { backgroundColor: '#EF4444' }]}
          />
          <Button title="Cancel" onPress={close} variant="ghost" style={s.btn} />
        </View>
      </BottomSheet>
    </>
  )
}

const SLATE = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  400: '#94A3B8',
  500: '#64748B',
  700: '#334155',
  900: '#0F172A',
}

const s = StyleSheet.create({
  container: {
    backgroundColor: SLATE[50],
    paddingTop: 24,
    paddingBottom: 56,
    gap: 16,
  },
  pageHeader: { gap: 4, marginBottom: 8 },
  pageTitle: { fontSize: 30, fontWeight: '800', color: SLATE[900], letterSpacing: -0.8 },
  pageSubtitle: { fontSize: 15, color: SLATE[500] },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: SLATE[400],
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  cards: { gap: 8 },
  fullWidth: { width: '100%' },
  flex: { flex: 1 },

  // Trigger
  triggerRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  triggerLabel: { fontSize: 15, fontWeight: '600', color: SLATE[900] },
  triggerDesc: { fontSize: 12, color: SLATE[400], marginTop: 1 },

  // Sheet
  sheetBody: { paddingHorizontal: 20, paddingBottom: 36, gap: 4 },
  groupLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: SLATE[400],
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: 8,
    marginBottom: 4,
  },
  divider: { height: 1, backgroundColor: SLATE[100], marginVertical: 16 },

  // Radio
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 4,
  },
  radioRowActive: { backgroundColor: '#EEF2FF' },
  radioRowPressed: { backgroundColor: SLATE[100] },
  radioLabel: { fontSize: 15, color: SLATE[700], fontWeight: '500' },
  radioLabelActive: { color: '#6366F1', fontWeight: '600' },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: SLATE[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: { borderColor: '#6366F1' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#6366F1' },

  // Toggle
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  toggleLabel: { fontSize: 15, fontWeight: '500', color: SLATE[900] },
  toggleSub: { fontSize: 12, color: SLATE[400], marginTop: 2 },

  btn: { marginTop: 8 },

  // Profile
  profileHeader: { flexDirection: 'row', gap: 16, alignItems: 'center', paddingTop: 8 },
  profileName: { fontSize: 18, fontWeight: '700', color: SLATE[900], letterSpacing: -0.3 },
  profileRole: { fontSize: 13, color: SLATE[500], marginTop: 2 },
  statsRow: { flexDirection: 'row', marginTop: 16 },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 20, fontWeight: '700', color: SLATE[900], letterSpacing: -0.5 },
  statLabel: { fontSize: 11, color: SLATE[400], fontWeight: '500' },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 12,
  },
  actionRowPressed: { backgroundColor: SLATE[50] },
  actionLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: SLATE[900] },

  // Confirm
  confirmIconWrap: { alignItems: 'center', marginTop: 8, marginBottom: 4 },
  confirmTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: SLATE[900],
    textAlign: 'center',
    letterSpacing: -0.3,
    marginTop: 12,
  },
  confirmBody: {
    fontSize: 14,
    color: SLATE[500],
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 4,
  },
})
