import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

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
  default: '#6366F1',
  filled: '#FFFFFF',
  outlined: '#6366F1',
  ghost: '#6366F1',
}

const BG_COLOR: Record<IconVariant, string> = {
  default: '#EEF2FF',
  filled: '#6366F1',
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
  style,
}: IconWrapperProps) {
  const { container, icon } = SIZE_MAP[size]
  const br = borderRadius ?? container / 4
  const resolvedColor = color ?? ICON_COLOR[variant]
  const resolvedBg = backgroundColor ?? BG_COLOR[variant]
  const isOutlined = variant === 'outlined'

  return (
    <View
      style={[
        styles.wrapper,
        {
          width: container,
          height: container,
          borderRadius: br,
          backgroundColor: resolvedBg,
          borderWidth: isOutlined ? 1.5 : 0,
          borderColor: isOutlined ? '#C7D2FE' : 'transparent',
        } as ViewStyle,
        style,
      ]}
    >
      <Ionicons name={name} size={icon} color={resolvedColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
