import { LinearGradient } from 'expo-linear-gradient'
import React, { ReactNode } from 'react'
import { ColorValue, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'

type GradientTuple = readonly [ColorValue, ColorValue, ...ColorValue[]]

type AppButtonProps = {
  title: string
  onPress: () => void
  icon?: ReactNode
  style?: ViewStyle
  disabled?: boolean
  gradientColors?: GradientTuple
  textColor?: ColorValue
}

const DEFAULT_GRADIENT: GradientTuple = ['#1C339A', '#2947C7']
const DEFAULT_TEXT_COLOR: ColorValue = '#FFFFFF'

const AppButton = ({
  title,
  onPress,
  icon,
  style,
  disabled = false,
  gradientColors = DEFAULT_GRADIENT,
  textColor = DEFAULT_TEXT_COLOR,
}: AppButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </LinearGradient>
    </Pressable>
  )
}

export default AppButton

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
})
