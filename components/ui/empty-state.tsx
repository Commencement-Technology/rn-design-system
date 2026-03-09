import React from 'react'
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  ctaLabel?: string
  onCtaPress?: () => void
  style?: ViewStyle
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  ctaLabel,
  onCtaPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}

      <Text style={styles.title}>{title}</Text>

      {description && <Text style={styles.description}>{description}</Text>}

      {ctaLabel && onCtaPress && (
        <Pressable style={styles.button} onPress={onCtaPress}>
          <Text style={styles.buttonText}>{ctaLabel}</Text>
        </Pressable>
      )}
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },

  iconWrapper: {
    marginBottom: 16,
    backgroundColor: '#F1F5F9',
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 280,
    lineHeight: 20,
  },

  button: {
    marginTop: 20,
    backgroundColor: '#473401',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    width: '100%',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
})
