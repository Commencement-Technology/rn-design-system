import Modal from '@/components/ui/modal'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type ModalVariant = 'default' | 'danger' | 'success' | 'warning'

type ActiveModal = ModalVariant | null

export default function ModalDemo() {
  const [active, setActive] = useState<ActiveModal>(null)
  const open = (m: ActiveModal) => setActive(m)
  const close = () => setActive(null)

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Modal</Text>

        <Text style={styles.label}>Variants</Text>
        <View style={styles.group}>
          <Row label="Default" onPress={() => open('default')} />
          <Row label="Danger" onPress={() => open('danger')} />
          <Row label="Success" onPress={() => open('success')} />
          <Row label="Warning" onPress={() => open('warning')} />
        </View>
      </ScrollView>

      <Modal
        visible={active === 'default'}
        onClose={close}
        icon="🚪"
        title="Log out?"
        description="You'll need to sign in again to access your account."
        actions={[
          { label: 'Cancel', variant: 'ghost', onPress: close },
          { label: 'Log Out', variant: 'primary', onPress: close },
        ]}
      />

      <Modal
        visible={active === 'danger'}
        onClose={close}
        variant="danger"
        title="Delete account?"
        description="All your data will be permanently removed. This cannot be undone."
        actions={[
          { label: 'Cancel', variant: 'ghost', onPress: close },
          { label: 'Delete Forever', variant: 'danger', onPress: close },
        ]}
      />

      <Modal
        visible={active === 'success'}
        onClose={close}
        variant="success"
        title="Payment successful!"
        description="Your Pro subscription is now active. Enjoy all premium features."
        actions={[{ label: 'Continue', variant: 'primary', onPress: close }]}
      />

      <Modal
        visible={active === 'warning'}
        onClose={close}
        variant="warning"
        title="Storage almost full"
        description="You've used 95% of your storage. Upgrade your plan to keep uploading."
        actions={[
          { label: 'Upgrade Plan', variant: 'primary', onPress: close },
          { label: 'Maybe Later', variant: 'ghost', onPress: close },
        ]}
      />
    </SafeAreaView>
  )
}

function Row({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
    >
      <Text style={styles.btnText}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    gap: 12,
    paddingBottom: 48,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 8,
  },
  group: {
    gap: 8,
  },
  btn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
})
