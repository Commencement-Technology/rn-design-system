import React, { useEffect, useRef } from 'react'
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native'

export type ToastType = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition = 'top' | 'bottom'

export interface ToastProps {
  visible: boolean
  message: string
  type?: ToastType
  position?: ToastPosition
  duration?: number // ms before auto-dismiss (0 = no auto-dismiss)
  action?: {
    label: string
    onPress: () => void
  }
  onDismiss?: () => void
}

const TOKEN: Record<ToastType, { bg: string; border: string; icon: string; label: string }> = {
  success: { bg: '#F0FAF4', border: '#A8D5B5', icon: '✓', label: '#2D7A4F' },
  error: { bg: '#FDF2F2', border: '#F1AAAA', icon: '✕', label: '#B94040' },
  warning: { bg: '#FFFBF0', border: '#F5D98B', icon: '!', label: '#9A6F00' },
  info: { bg: '#F0F5FF', border: '#AABFED', label: '#2E54A3', icon: 'i' },
}

const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  position = 'bottom',
  duration = 3500,
  action,
  onDismiss,
}) => {
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(position === 'bottom' ? 20 : -20)).current
  const token = TOKEN[type]

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 18,
          stiffness: 200,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()

      if (duration > 0) {
        const timer = setTimeout(() => dismiss(), duration)
        return () => clearTimeout(timer)
      }
    } else {
      dismiss()
    }
  }, [visible])

  const dismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'bottom' ? 20 : -20,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss?.())
  }

  if (!visible) return null

  return (
    <Animated.View
      style={[
        styles.wrapper,
        position === 'top' ? styles.top : styles.bottom,
        { opacity, transform: [{ translateY }] },
      ]}
      pointerEvents="box-none"
    >
      <View style={[styles.container, { backgroundColor: token.bg, borderColor: token.border }]}>
        {/* Icon pill */}
        <View style={[styles.iconPill, { backgroundColor: token.border }]}>
          <Text style={[styles.iconText, { color: token.label }]}>{token.icon}</Text>
        </View>

        {/* Message */}
        <Text style={[styles.message, { color: '#1C1C1E' }]} numberOfLines={2}>
          {message}
        </Text>

        {/* Action or Dismiss */}
        {action ? (
          <Pressable
            onPress={() => {
              action.onPress()
              dismiss()
            }}
            hitSlop={8}
            style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}
          >
            <Text style={[styles.actionText, { color: token.label }]}>{action.label}</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={dismiss}
            hitSlop={8}
            style={({ pressed }) => pressed && { opacity: 0.5 }}
          >
            <Text style={[styles.closeText, { color: token.label }]}>✕</Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: 'stretch',
  },
  top: {
    top: Platform.OS === 'ios' ? 60 : 40,
  },
  bottom: {
    bottom: Platform.OS === 'ios' ? 40 : 24,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
  iconPill: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: {
    fontSize: 12,
    fontWeight: '700',
  },
  message: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0.1,
  },
  actionBtn: {
    paddingHorizontal: 4,
    flexShrink: 0,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  closeText: {
    fontSize: 13,
    fontWeight: '600',
    flexShrink: 0,
  },
})

export default Toast
