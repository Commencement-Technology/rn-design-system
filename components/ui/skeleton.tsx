import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View, ViewStyle } from 'react-native'

export interface SkeletonProps {
  width?: number | `${number}%`
  height?: number
  borderRadius?: number
  style?: ViewStyle
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 8,
  style,
}) => {
  const shimmer = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ]),
    ).start()
  }, [])

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0.9],
  })

  return <Animated.View style={[styles.base, { width, height, borderRadius, opacity }, style]} />
}

// --- Preset Compositions ---

/** Single text line */
export const SkeletonText: React.FC<{ width?: number | `${number}%` }> = ({ width = '100%' }) => (
  <Skeleton width={width} height={14} borderRadius={6} />
)

/** Circular avatar */
export const SkeletonAvatar: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <Skeleton width={size} height={size} borderRadius={size / 2} />
)

/** Card block */
export const SkeletonCard: React.FC = () => (
  <View style={styles.card}>
    <Skeleton width="100%" height={160} borderRadius={14} />
    <View style={styles.cardBody}>
      <SkeletonText width="65%" />
      <View style={{ height: 6 }} />
      <SkeletonText width="40%" />
    </View>
  </View>
)

/** List row with leading avatar */
export const SkeletonListItem: React.FC = () => (
  <View style={styles.listItem}>
    <SkeletonAvatar size={44} />
    <View style={styles.listItemText}>
      <SkeletonText width="55%" />
      <View style={{ height: 7 }} />
      <SkeletonText width="80%" />
    </View>
  </View>
)

/** Profile header block */
export const SkeletonProfile: React.FC = () => (
  <View style={styles.profile}>
    <SkeletonAvatar size={72} />
    <View style={{ height: 12 }} />
    <SkeletonText width="40%" />
    <View style={{ height: 8 }} />
    <SkeletonText width="65%" />
    <View style={{ height: 6 }} />
    <SkeletonText width="50%" />
  </View>
)

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#E4E6EB',
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F5F5F7',
    marginBottom: 14,
  },
  cardBody: {
    padding: 14,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10,
  },
  listItemText: {
    flex: 1,
  },
  profile: {
    alignItems: 'center',
    paddingVertical: 24,
  },
})
