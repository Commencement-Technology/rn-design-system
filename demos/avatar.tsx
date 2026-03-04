import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Avatar } from '../components/ui/avatar'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type AvatarVariant = 'circle' | 'rounded' | 'square'
type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

const USERS = [
  { name: 'Alice Johnson', uri: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Bob Smith', uri: undefined },
  { name: 'Carol White', uri: 'https://i.pravatar.cc/150?img=4' },
  { name: 'David Lee', uri: undefined },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{title}</Text>
      {children}
    </View>
  )
}

export default function AvatarDemo() {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Avatar</Text>

      <Section title="Sizes">
        <View style={[styles.row, styles.alignEnd]}>
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as AvatarSize[]).map((s) => (
            <View key={s} style={styles.cell}>
              <Avatar name="Alex Ray" size={s} />
              <Text style={styles.cellLabel}>{s}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Shape Variants">
        <View style={styles.row}>
          {(['circle', 'rounded', 'square'] as AvatarVariant[]).map((v) => (
            <View key={v} style={styles.cell}>
              <Avatar name="Sam Park" size="lg" variant={v} />
              <Text style={styles.cellLabel}>{v}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="With Images">
        <View style={styles.row}>
          {USERS.map((u) => (
            <View key={u.name} style={styles.cell}>
              <Avatar name={u.name} uri={u.uri} size="lg" />
              <Text style={styles.cellLabel}>{u.name.split(' ')[0]}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Status Indicators">
        <View style={styles.row}>
          {(['online', 'offline', 'away', 'busy'] as AvatarStatus[]).map((s) => (
            <View key={s} style={styles.cell}>
              <Avatar name="Jo Kim" size="lg" status={s} />
              <Text style={styles.cellLabel}>{s}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Notification Badges">
        <View style={styles.row}>
          {[1, 5, 12, 100].map((b) => (
            <View key={b} style={styles.cell}>
              <Avatar name="Max Liu" size="lg" badge={b} />
              <Text style={styles.cellLabel}>{b}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Pressable — tap to see scale">
        <View style={styles.row}>
          {USERS.map((u) => (
            <View key={u.name} style={styles.cell}>
              <Avatar
                name={u.name}
                uri={u.uri}
                size="xl"
                status="online"
                badge={3}
                onPress={() => {}}
              />
              <Text style={styles.cellLabel}>{u.name.split(' ')[0]}</Text>
            </View>
          ))}
        </View>
      </Section>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  section: {
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  cell: {
    alignItems: 'center',
    gap: 6,
  },
  cellLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
})
