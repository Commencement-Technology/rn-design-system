import { ComponentMeta } from '@/constants/component-registry'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import IconWrapper from './ui/icon-wrapper'

interface ComponentCardProps {
  component: ComponentMeta
  cardWidth: number
  onPress: () => void
}

const CATEGORY_STYLES: Record<
  string,
  { iconBg: string; iconColor: string; badgeBg: string; badgeText: string; dot: string }
> = {
  Primitives: {
    iconBg: '#EEF2FF',
    iconColor: '#818CF8',
    badgeBg: '#F5F3FF',
    badgeText: '#7C6FCD',
    dot: '#818CF8',
  },
  Forms: {
    iconBg: '#F0FDFA',
    iconColor: '#2DD4BF',
    badgeBg: '#F0FDFA',
    badgeText: '#0F9080',
    dot: '#2DD4BF',
  },
  Layout: {
    iconBg: '#FFF7ED',
    iconColor: '#FB923C',
    badgeBg: '#FFF7ED',
    badgeText: '#C2570A',
    dot: '#FB923C',
  },
  Navigation: {
    iconBg: '#F5F3FF',
    iconColor: '#A78BFA',
    badgeBg: '#F5F3FF',
    badgeText: '#7C3AED',
    dot: '#A78BFA',
  },
  Feedback: {
    iconBg: '#FFF1F2',
    iconColor: '#FB7185',
    badgeBg: '#FFF1F2',
    badgeText: '#BE123C',
    dot: '#FB7185',
  },
  Typography: {
    iconBg: '#F0F9FF',
    iconColor: '#38BDF8',
    badgeBg: '#F0F9FF',
    badgeText: '#0369A1',
    dot: '#38BDF8',
  },
}

export default function ComponentCard({ component, cardWidth, onPress }: ComponentCardProps) {
  const cat = CATEGORY_STYLES[component.category]

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, { width: cardWidth }, pressed && styles.cardPressed]}
    >
      <IconWrapper
        name={component.icon as any}
        size="sm"
        color={cat.iconColor}
        backgroundColor={cat.iconBg}
        borderRadius={12}
        variant="ghost"
      />

      <View style={styles.body}>
        <Text style={styles.title}>{component.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {component.description}
        </Text>
      </View>

      <View style={[styles.badge, { backgroundColor: cat.badgeBg }]}>
        <View style={[styles.dot, { backgroundColor: cat.dot }]} />
        <Text style={[styles.badgeText, { color: cat.badgeText }]}>{component.category}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#94A3B8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  body: {
    gap: 3,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: -0.1,
  },
  description: {
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
    gap: 4,
    marginTop: 2,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
})
