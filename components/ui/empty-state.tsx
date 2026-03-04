import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'

type IoniconsName = React.ComponentProps<typeof Ionicons>['name']

interface CTAButton {
  label: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
}

interface EmptyStateProps {
  icon?: IoniconsName
  illustration?: React.ReactNode
  title: string
  description?: string
  cta?: CTAButton
  secondaryCta?: CTAButton
  style?: ViewStyle
  animated?: boolean
}

export default function EmptyState({
  icon = 'search-outline',
  illustration,
  title,
  description,
  cta,
  secondaryCta,
  style,
  animated = true,
}: EmptyStateProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateAnim = useRef(new Animated.Value(20)).current
  const scaleAnim = useRef(new Animated.Value(0.85)).current

  useEffect(() => {
    if (!animated) {
      fadeAnim.setValue(1)
      translateAnim.setValue(0)
      scaleAnim.setValue(1)
      return
    }
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: 100, useNativeDriver: true }),
      Animated.spring(translateAnim, {
        toValue: 0,
        tension: 60,
        friction: 10,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 10,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start()
  }, [animated])

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        { opacity: fadeAnim, transform: [{ translateY: translateAnim }] },
      ]}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {illustration ?? (
          <View style={styles.iconCircle}>
            <View style={styles.iconInner}>
              <Ionicons name={icon} size={36} color="#6366F1" />
            </View>
          </View>
        )}
      </Animated.View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>

      {(cta || secondaryCta) && (
        <View style={styles.actions}>
          {cta && <CTABtn {...cta} variant="primary" />}
          {secondaryCta && <CTABtn {...secondaryCta} variant="secondary" />}
        </View>
      )}
    </Animated.View>
  )
}

function CTABtn({ label, onPress, variant = 'primary' }: CTAButton) {
  const isPrimary = variant === 'primary'
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        isPrimary ? styles.btnPrimary : styles.btnSecondary,
        pressed && styles.btnPressed,
      ]}
    >
      <Text
        style={[styles.btnLabel, isPrimary ? styles.btnLabelPrimary : styles.btnLabelSecondary]}
      >
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  iconInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    alignItems: 'center',
    gap: 10,
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.3,
    lineHeight: 28,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  actions: {
    width: '100%',
    gap: 10,
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    maxWidth: 280,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  btnSecondary: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  btnLabel: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  btnLabelPrimary: {
    color: '#FFFFFF',
  },
  btnLabelSecondary: {
    color: '#475569',
  },
})
