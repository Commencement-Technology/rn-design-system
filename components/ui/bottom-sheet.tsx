import { Ionicons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export type BottomSheetHeight = 'sm' | 'md' | 'lg' | 'full' | number

const HEIGHT_MAP: Record<Exclude<BottomSheetHeight, number>, number> = {
  sm: SCREEN_HEIGHT * 0.38,
  md: SCREEN_HEIGHT * 0.55,
  lg: SCREEN_HEIGHT * 0.75,
  full: SCREEN_HEIGHT * 0.92,
}

const DRAG_CLOSE_THRESHOLD = 100
const DRAG_CLOSE_VELOCITY = 0.5

interface BottomSheetProps {
  visible: boolean
  onClose: () => void
  title?: string
  height?: BottomSheetHeight
  showCloseButton?: boolean
  showHandle?: boolean
  children?: React.ReactNode
  contentStyle?: ViewStyle
}

export default function BottomSheet({
  visible,
  onClose,
  title,
  height = 'md',
  showCloseButton = true,
  showHandle = true,
  children,
  contentStyle,
}: BottomSheetProps) {
  const sheetHeight = typeof height === 'number' ? height : HEIGHT_MAP[height]

  const translateY = useRef(new Animated.Value(sheetHeight)).current
  const overlayOpacity = useRef(new Animated.Value(0)).current
  const lastGestureY = useRef(0)

  const open = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start()
  }, [translateY, overlayOpacity])

  const close = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: sheetHeight,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start(() => onClose())
  }, [translateY, overlayOpacity, sheetHeight, onClose])

  useEffect(() => {
    if (visible) {
      translateY.setValue(sheetHeight)
      overlayOpacity.setValue(0)
      open()
    }
  }, [visible])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 5,
      onPanResponderGrant: () => {
        lastGestureY.current = 0
      },
      onPanResponderMove: (_, g) => {
        const dy = Math.max(0, g.dy) // only allow dragging down
        translateY.setValue(dy)
        const progress = Math.max(0, 1 - dy / sheetHeight)
        overlayOpacity.setValue(progress)
        lastGestureY.current = g.dy
      },
      onPanResponderRelease: (_, g) => {
        const shouldClose = g.dy > DRAG_CLOSE_THRESHOLD || g.vy > DRAG_CLOSE_VELOCITY
        if (shouldClose) {
          close()
        } else {
          Animated.parallel([
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              tension: 65,
              friction: 11,
            }),
            Animated.timing(overlayOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start()
        }
      },
    }),
  ).current

  if (!visible) return null

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={close}>
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={close}>
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      </TouchableWithoutFeedback>

      {/* Sheet */}
      <Animated.View style={[styles.sheet, { height: sheetHeight, transform: [{ translateY }] }]}>
        {/* Drag area — handle + header row together */}
        <View {...panResponder.panHandlers} style={styles.dragArea}>
          {showHandle && (
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
          )}

          {(title || showCloseButton) && (
            <View style={styles.header}>
              <Text style={styles.title} numberOfLines={1}>
                {title ?? ''}
              </Text>
              {showCloseButton && (
                <Pressable
                  onPress={close}
                  style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                >
                  <Ionicons name="close" size={18} color="#64748B" />
                </Pressable>
              )}
            </View>
          )}
        </View>

        {/* Content */}
        <View style={[styles.content, contentStyle]}>{children}</View>
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 16,
  },
  dragArea: {
    paddingBottom: 4,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 4,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
    flex: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  closeBtnPressed: {
    backgroundColor: '#E2E8F0',
    transform: [{ scale: 0.94 }],
  },
  content: {
    flex: 1,
  },
})
