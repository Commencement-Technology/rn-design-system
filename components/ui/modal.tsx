import React, { useEffect, useRef } from 'react'
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export type ModalVariant = 'default' | 'danger' | 'success' | 'warning'

export interface ModalAction {
  label: string
  onPress: () => void
  variant?: 'primary' | 'danger' | 'ghost'
}

export interface ModalProps {
  visible: boolean
  onClose: () => void
  title?: string
  description?: string
  icon?: string
  variant?: ModalVariant
  actions?: ModalAction[]
  dismissable?: boolean
  children?: React.ReactNode
}

const VARIANT_ICON: Record<ModalVariant, string> = {
  default: '',
  danger: '⚠️',
  success: '✅',
  warning: '🔔',
}

export default function Modal({
  visible,
  onClose,
  title,
  description,
  icon,
  variant = 'default',
  actions = [],
  dismissable = true,
  children,
}: ModalProps) {
  const backdropOpacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(0.94)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      scale.setValue(0.94)
      opacity.setValue(0)
      Animated.parallel([
        Animated.timing(backdropOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, damping: 20, stiffness: 280, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 160, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.94, duration: 180, useNativeDriver: true }),
      ]).start()
    }
  }, [visible])

  const resolvedIcon = icon ?? (variant !== 'default' ? VARIANT_ICON[variant] : undefined)

  return (
    <RNModal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={dismissable ? onClose : undefined} />
        </Animated.View>

        <View style={styles.centeredWrapper} pointerEvents="box-none">
          <Animated.View style={[styles.dialog, { opacity, transform: [{ scale }] }]}>
            <Pressable onPress={() => {}}>
              {resolvedIcon ? <Text style={styles.icon}>{resolvedIcon}</Text> : null}
              {title ? <Text style={styles.title}>{title}</Text> : null}
              {description ? <Text style={styles.description}>{description}</Text> : null}

              {children ? (
                <ScrollView
                  style={styles.childrenScroll}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                >
                  {children}
                </ScrollView>
              ) : null}

              {actions.length > 0 && (
                <View style={[styles.actions, actions.length === 2 && styles.actionsRow]}>
                  {actions.map((action, i) => (
                    <Pressable
                      key={i}
                      onPress={action.onPress}
                      style={({ pressed }) => [
                        styles.btn,
                        action.variant === 'danger' && styles.btnDanger,
                        action.variant === 'ghost' && styles.btnGhost,
                        action.variant !== 'danger' &&
                          action.variant !== 'ghost' &&
                          styles.btnPrimary,
                        actions.length === 2 && styles.btnFlex,
                        pressed && styles.btnPressed,
                      ]}
                    >
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={[
                          styles.btnText,
                          action.variant === 'danger' && styles.btnTextDanger,
                          action.variant === 'ghost' && styles.btnTextGhost,
                          action.variant !== 'danger' &&
                            action.variant !== 'ghost' &&
                            styles.btnTextPrimary,
                        ]}
                      >
                        {action.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </Pressable>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  centeredWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  dialog: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 10,
  },
  icon: {
    fontSize: 40,
    marginBottom: 14,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  childrenScroll: {
    width: '100%',
    maxHeight: 300,
    marginBottom: 20,
  },
  actions: {
    width: '100%',
    gap: 10,
  },
  actionsRow: {
    flexDirection: 'row',
  },
  btn: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
  },
  btnFlex: {
    flex: 1,
  },
  btnPrimary: {
    backgroundColor: '#0F172A',
  },
  btnDanger: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  btnGhost: {
    backgroundColor: '#F1F5F9',
  },
  btnPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
    flexShrink: 1,
  },
  btnTextPrimary: {
    color: '#FFFFFF',
  },
  btnTextDanger: {
    color: '#DC2626',
  },
  btnTextGhost: {
    color: '#475569',
  },
})
