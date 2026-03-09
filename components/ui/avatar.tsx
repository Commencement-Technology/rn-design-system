import React, { useState } from 'react'
import { Animated, Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarVariant = 'circle' | 'rounded' | 'square'

interface AvatarProps {
  uri?: string
  name?: string
  size?: AvatarSize
  variant?: AvatarVariant
  onPress?: () => void
  style?: ViewStyle
}

const SIZE_MAP: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 44,
  lg: 56,
  xl: 72,
  '2xl': 96,
}

const FONT_RATIO = 0.36

const RADIUS_MAP: Record<AvatarVariant, (size: number) => number> = {
  circle: (s) => s / 2,
  rounded: (s) => s / 4,
  square: () => 0,
}

const PALETTE = [
  { bg: '#EEF2FF', text: '#6366F1' },
  { bg: '#FDF2F8', text: '#A855F7' },
  { bg: '#FFF7ED', text: '#F97316' },
  { bg: '#ECFDF5', text: '#10B981' },
  { bg: '#FEF2F2', text: '#EF4444' },
  { bg: '#FFFBEB', text: '#F59E0B' },
  { bg: '#F0FDFA', text: '#14B8A6' },
  { bg: '#EFF6FF', text: '#3B82F6' },
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function getColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + hash * 31
  }
  return PALETTE[Math.abs(hash) % PALETTE.length]
}

const Avatar: React.FC<AvatarProps> = ({
  uri,
  name = '',
  size = 'md',
  variant = 'circle',
  onPress,
  style,
}) => {
  const [imageError, setImageError] = useState(false)
  const pressScale = React.useRef(new Animated.Value(1)).current

  const dim = SIZE_MAP[size]
  const br = RADIUS_MAP[variant](dim)
  const { bg, text: textColor } = getColor(name)
  const initials = name ? getInitials(name) : '?'
  const fontSize = Math.round(dim * FONT_RATIO)

  const showImage = !!uri && !imageError

  const handlePressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.92,
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

  const avatarCore = (
    <View
      style={[
        styles.avatar,
        {
          width: dim,
          height: dim,
          borderRadius: br,
          backgroundColor: showImage ? 'transparent' : bg,
        },
        style,
      ]}
    >
      {showImage ? (
        <Image
          source={{ uri }}
          style={[styles.image, { borderRadius: br }]}
          onError={() => setImageError(true)}
        />
      ) : (
        <Text style={[styles.initials, { fontSize, color: textColor }]}>{initials}</Text>
      )}
    </View>
  )

  if (!onPress) return avatarCore

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={{ transform: [{ scale: pressScale }] }}>{avatarCore}</Animated.View>
    </Pressable>
  )
}

export default Avatar

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
})
