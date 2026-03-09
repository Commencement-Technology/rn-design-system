import AppBar from '@/components/ui/app-bar'
import Avatar from '@/components/ui/avatar'
import IconWrapper from '@/components/ui/icon-wrapper'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  )
}

function DemoFrame({ children }: { children: React.ReactNode }) {
  return <View style={styles.frame}>{children}</View>
}

/** Notification bell with a red dot badge */
function NotifIcon() {
  return (
    <View>
      <IconWrapper
        name="notifications-outline"
        size="sm"
        variant="ghost"
        color="#1E293B"
        onPress={() => {}}
      />
      <View style={styles.notifDot} />
    </View>
  )
}

export default function AppBarDemo() {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>AppBar</Text>
        <Text style={styles.pageSubtitle}>Navigation header for screens and flows</Text>
      </View>

      {/* ── Default ── */}
      <Section title="Default — Left Title">
        <DemoFrame>
          <AppBar title="Inbox" />
        </DemoFrame>
        <Text style={styles.note}>Default state — no back button, left-aligned title.</Text>
      </Section>

      {/* ── Back button ── */}
      <Section title="With Back Button">
        <DemoFrame>
          <AppBar title="Edit Profile" showBackButton onBackPress={() => {}} />
        </DemoFrame>
        <Text style={styles.note}>
          Pass <Text style={styles.code}>showBackButton</Text> to reveal the chevron. Calls{' '}
          <Text style={styles.code}>router.back()</Text> by default or a custom handler.
        </Text>
      </Section>

      {/* ── Center title ── */}
      <Section title="Center Title">
        <DemoFrame>
          <AppBar title="Notifications" titleAlign="center" showBackButton onBackPress={() => {}} />
        </DemoFrame>
        <Text style={styles.note}>
          <Text style={styles.code}>titleAlign="center"</Text> adds balanced spacer views to keep
          the title truly centred.
        </Text>
      </Section>

      {/* ── Subtitle ── */}
      <Section title="Title + Subtitle">
        <DemoFrame>
          <AppBar
            title="Messages"
            subtitle="3 unread conversations"
            showBackButton
            onBackPress={() => {}}
          />
        </DemoFrame>
        <DemoFrame>
          <AppBar
            title="Daily Standup"
            subtitle="Mon, 9 March · 09:00 AM"
            titleAlign="center"
            showBackButton
            onBackPress={() => {}}
          />
        </DemoFrame>
        <Text style={styles.note}>Subtitle renders a secondary line in both alignment modes.</Text>
      </Section>

      {/* ── Right element: single icon ── */}
      <Section title="Right Element — Single Icon">
        <DemoFrame>
          <AppBar
            title="Search"
            rightElement={
              <IconWrapper name="search-outline" size="sm" variant="default" onPress={() => {}} />
            }
          />
        </DemoFrame>

        <DemoFrame>
          <AppBar title="Activity" rightElement={<NotifIcon />} />
        </DemoFrame>

        <Text style={styles.note}>
          Any <Text style={styles.code}>IconWrapper</Text> variant works — pass{' '}
          <Text style={styles.code}>onPress</Text> to make it tappable with a spring animation.
        </Text>
      </Section>

      {/* ── Right element: multiple icons ── */}
      <Section title="Right Element — Multiple Icons">
        <DemoFrame>
          <AppBar
            title="Feed"
            rightElement={
              <View style={styles.rightGroup}>
                <IconWrapper
                  name="bookmark-outline"
                  size="sm"
                  variant="default"
                  onPress={() => {}}
                />
                <IconWrapper
                  name="ellipsis-horizontal"
                  size="sm"
                  variant="ghost"
                  color="#1E293B"
                  onPress={() => {}}
                />
              </View>
            }
          />
        </DemoFrame>

        <DemoFrame>
          <AppBar
            title="Explore"
            rightElement={
              <View style={styles.rightGroup}>
                <IconWrapper
                  name="filter-outline"
                  size="sm"
                  variant="outlined"
                  onPress={() => {}}
                />
                <IconWrapper
                  name="search-outline"
                  size="sm"
                  variant="outlined"
                  onPress={() => {}}
                />
              </View>
            }
          />
        </DemoFrame>

        <Text style={styles.note}>
          Mix variants in a row — <Text style={styles.code}>default</Text>,{' '}
          <Text style={styles.code}>outlined</Text>, and <Text style={styles.code}>ghost</Text> all
          work naturally together.
        </Text>
      </Section>

      {/* ── Right element: Avatar ── */}
      <Section title="Right Element — Avatar">
        <DemoFrame>
          <AppBar
            title="Dashboard"
            subtitle="Welcome back, Alex"
            rightElement={
              <Pressable onPress={() => {}}>
                <Avatar
                  uri="https://i.pravatar.cc/150?img=12"
                  name="Alex Morgan"
                  size="sm"
                  variant="circle"
                />
              </Pressable>
            }
          />
        </DemoFrame>
        <Text style={styles.note}>
          Wrap <Text style={styles.code}>Avatar</Text> in a{' '}
          <Text style={styles.code}>Pressable</Text> for profile navigation.
        </Text>
      </Section>

      {/* ── Full composition ── */}
      <Section title="Full Composition">
        <DemoFrame>
          <AppBar
            title="Team Chat"
            subtitle="12 members online"
            titleAlign="center"
            showBackButton
            onBackPress={() => {}}
            rightElement={
              <View style={styles.rightGroup}>
                <IconWrapper
                  name="videocam-outline"
                  size="sm"
                  variant="default"
                  onPress={() => {}}
                />
                <IconWrapper
                  name="ellipsis-vertical"
                  size="sm"
                  variant="ghost"
                  color="#1E293B"
                  onPress={() => {}}
                />
              </View>
            }
          />
        </DemoFrame>

        <DemoFrame>
          <AppBar
            title="Alex Morgan"
            subtitle="Product Designer"
            showBackButton
            onBackPress={() => {}}
            rightElement={
              <View style={styles.rightGroup}>
                <IconWrapper name="call-outline" size="sm" variant="filled" onPress={() => {}} />
                <IconWrapper
                  name="videocam-outline"
                  size="sm"
                  variant="default"
                  onPress={() => {}}
                />
              </View>
            }
          />
        </DemoFrame>

        <Text style={styles.note}>
          Back button + subtitle + multiple right actions — typical for chat or detail screens.
        </Text>
      </Section>
    </ScrollView>
  )
}

const SLATE = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  400: '#94A3B8',
  500: '#64748B',
  900: '#0F172A',
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SLATE[50],
    paddingTop: 24,
    paddingBottom: 56,
    gap: 32,
  },

  pageHeader: { gap: 4 },
  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: SLATE[900],
    letterSpacing: -0.8,
  },
  pageSubtitle: {
    fontSize: 15,
    color: SLATE[500],
    fontWeight: '400',
  },

  section: { gap: 10 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: SLATE[400],
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionContent: { gap: 8 },

  frame: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: SLATE[200],
    backgroundColor: '#FFFFFF',
  },

  note: {
    fontSize: 13,
    color: SLATE[500],
    lineHeight: 20,
    marginTop: 2,
  },
  code: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: '#6366F1',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 4,
    borderRadius: 4,
  },

  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  notifDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: SLATE[100],
  },
})
