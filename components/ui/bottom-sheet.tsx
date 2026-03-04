import React, { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'

interface BottomSheetProps {
  visible: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: React.ReactNode
  snapPoints?: ('25%' | '50%' | '75%' | '90%')[]
  showHandle?: boolean
  showCloseButton?: boolean
  contentStyle?: ViewStyle
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const DRAG_THRESHOLD = 80
const ANIMATION_CONFIG = { tension: 65, friction: 11, useNativeDriver: true }

const COLORS = {
  bg: '#FFFFFF',
  overlay: 'rgba(15,23,42,0.5)',
  handle: '#CBD5E1',
  title: '#0F172A',
  subtitle: '#64748B',
  border: '#F1F5F9',
  closeIcon: '#94A3B8',
  closeIconBg: '#F8FAFC',
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  children,
  snapPoints = ['50%'],
  showHandle = true,
  showCloseButton = true,
  contentStyle,
}) => {
  const snapHeight = SCREEN_HEIGHT * (parseInt(snapPoints[0]) / 100)

  const translateY = useRef(new Animated.Value(snapHeight)).current
  const overlayOpacity = useRef(new Animated.Value(0)).current
  const dragY = useRef(new Animated.Value(0)).current

  // ── Open / Close animations ────────

  const open = useCallback(() => {
    translateY.setValue(snapHeight)
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        ...ANIMATION_CONFIG,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start()
  }, [snapHeight])

  const close = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: snapHeight,
        ...ANIMATION_CONFIG,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => onClose())
  }, [snapHeight, onClose])

  useEffect(() => {
    if (visible) open()
  }, [visible, open])

  // ── Pan Responder for drag-to-dismiss ──────────
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 5,
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) translateY.setValue(dy)
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > DRAG_THRESHOLD || vy > 0.5) {
          close()
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            ...ANIMATION_CONFIG,
          }).start()
        }
      },
    }),
  ).current

  if (!visible) return null

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={close}
    >
      {/* Overlay */}
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={close} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            height: snapHeight,
            transform: [{ translateY }],
          },
        ]}
      >
        {/* Drag handle */}
        {showHandle && (
          <View style={styles.handleContainer} {...panResponder.panHandlers}>
            <View style={styles.handle} />
          </View>
        )}

        {/* Header */}
        {(title || showCloseButton) && (
          <View style={styles.header}>
            <View style={styles.headerText}>
              {title && <Text style={styles.title}>{title}</Text>}
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
            {showCloseButton && (
              <Pressable
                style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
                onPress={close}
                hitSlop={8}
              >
                <Text style={styles.closeX}>✕</Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Divider */}
        {title && <View style={styles.divider} />}

        {/* Content */}
        <ScrollView
          style={[styles.content, contentStyle]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {children}
        </ScrollView>
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 24,
  },
  handleContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.handle,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.title,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.subtitle,
    marginTop: 2,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.closeIconBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginTop: 2,
  },
  closeBtnPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.93 }],
  },
  closeX: {
    fontSize: 12,
    color: COLORS.closeIcon,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 24,
    marginBottom: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
})
