import React, { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'

type ToggleSize = 'sm' | 'md' | 'lg'

interface ToggleProps {
  value: boolean
  onValueChange: (value: boolean) => void
  size?: ToggleSize
  activeColor?: string
  disabled?: boolean
  label?: string
  description?: string
  style?: ViewStyle
}

const SIZE: Record<ToggleSize, { trackW: number; trackH: number; thumb: number; padding: number }> =
  {
    sm: { trackW: 36, trackH: 20, thumb: 14, padding: 3 },
    md: { trackW: 48, trackH: 26, thumb: 20, padding: 3 },
    lg: { trackW: 58, trackH: 32, thumb: 24, padding: 4 },
  }

export default function Toggle({
  value,
  onValueChange,
  size = 'md',
  activeColor = '#6366F1',
  disabled = false,
  label,
  description,
  style,
}: ToggleProps) {
  const config = SIZE[size]
  const travelDistance = config.trackW - config.thumb - config.padding * 2

  const translateX = useRef(new Animated.Value(value ? travelDistance : 0)).current
  const trackColor = useRef(new Animated.Value(value ? 1 : 0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? travelDistance : 0,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(trackColor, {
        toValue: value ? 1 : 0,
        duration: 180,
        useNativeDriver: false,
      }),
    ]).start()
  }, [value])

  const bg = trackColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#CBD5E1', activeColor],
  })

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      style={[styles.row, disabled && styles.disabled, style]}
      hitSlop={4}
    >
      {(label || description) && (
        <View style={styles.labelBlock}>
          {label ? <Text style={styles.label}>{label}</Text> : null}
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
      )}

      <Animated.View
        style={[
          styles.track,
          {
            width: config.trackW,
            height: config.trackH,
            borderRadius: config.trackH / 2,
            padding: config.padding,
            backgroundColor: bg,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: config.thumb,
              height: config.thumb,
              borderRadius: config.thumb / 2,
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  disabled: {
    opacity: 0.4,
  },
  labelBlock: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  description: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
  },
  track: {
    justifyContent: 'center',
    flexShrink: 0,
  },
  thumb: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
})
