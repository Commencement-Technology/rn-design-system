import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Animated, Pressable, StyleSheet, View, ViewStyle } from 'react-native'

export type IoniconsName = React.ComponentProps<typeof Ionicons>['name']
export type IconVariant = 'default' | 'filled' | 'outlined' | 'ghost'
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface IconWrapperProps {
  name: IoniconsName
  size?: IconSize
  color?: string
  backgroundColor?: string
  variant?: IconVariant
  borderRadius?: number
  onPress?: () => void
  style?: ViewStyle
}

const SIZE_MAP: Record<IconSize, { container: number; icon: number }> = {
  xs: { container: 24, icon: 12 },
  sm: { container: 32, icon: 16 },
  md: { container: 44, icon: 22 },
  lg: { container: 56, icon: 28 },
  xl: { container: 72, icon: 36 },
}

const ICON_COLOR: Record<IconVariant, string> = {
  default: '#319795',
  filled: '#FFFFFF',
  outlined: '#319795',
  ghost: '#319795',
}

const BG_COLOR: Record<IconVariant, string> = {
  default: '#EEF2FF',
  filled: '#319795',
  outlined: '#FFFFFF',
  ghost: 'transparent',
}

export default function IconWrapper({
  name,
  size = 'md',
  color,
  backgroundColor,
  variant = 'default',
  borderRadius,
  onPress,
  style,
}: IconWrapperProps) {
  const { container, icon } = SIZE_MAP[size]
  const br = borderRadius ?? container / 4
  const resolvedColor = color ?? ICON_COLOR[variant]
  const resolvedBg = backgroundColor ?? BG_COLOR[variant]
  const isOutlined = variant === 'outlined'
  const pressScale = React.useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.88,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start()
  }

  const inner = (
    <View
      style={[
        styles.wrapper,
        {
          width: container,
          height: container,
          borderRadius: br,
          backgroundColor: resolvedBg,
          borderWidth: isOutlined ? 1.5 : 0,
          borderColor: isOutlined ? '#A9D1C9' : 'transparent',
        } as ViewStyle,
        !onPress && style,
      ]}
    >
      <Ionicons name={name} size={icon} color={resolvedColor} />
    </View>
  )

  if (!onPress) return inner

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      hitSlop={6}
    >
      <Animated.View style={[{ transform: [{ scale: pressScale }] }, style]}>{inner}</Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
