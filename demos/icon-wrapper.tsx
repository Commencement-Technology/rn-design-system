import { ScrollView, StyleSheet, Text, View } from 'react-native'
import IconWrapper, { IconSize, IconVariant } from '../components/ui/icon-wrapper'

function IconWrapperDemo() {
  return (
    <ScrollView contentContainerStyle={demoStyles.container} showsVerticalScrollIndicator={false}>
      <Text style={demoStyles.heading}>Icon Wrapper</Text>
      <Text style={demoStyles.sub}>Variants</Text>

      <View style={demoStyles.row}>
        {(['default', 'filled', 'outlined', 'ghost'] as IconVariant[]).map((v) => (
          <View key={v} style={demoStyles.cell}>
            <IconWrapper name="star" variant={v} />
            <Text style={demoStyles.label}>{v}</Text>
          </View>
        ))}
      </View>

      <Text style={demoStyles.sub}>Sizes</Text>
      <View style={[demoStyles.row, { alignItems: 'flex-end' }]}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as IconSize[]).map((s) => (
          <View key={s} style={demoStyles.cell}>
            <IconWrapper name="heart" size={s} variant="filled" />
            <Text style={demoStyles.label}>{s}</Text>
          </View>
        ))}
      </View>

      <Text style={demoStyles.sub}>Custom Colors</Text>
      <View style={demoStyles.row}>
        {[
          { color: '#EF4444', bg: '#FEF2F2' },
          { color: '#10B981', bg: '#ECFDF5' },
          { color: '#F59E0B', bg: '#FFFBEB' },
          { color: '#8B5CF6', bg: '#F5F3FF' },
        ].map(({ color, bg }, i) => (
          <IconWrapper
            key={i}
            name="flash"
            size="lg"
            color={color}
            backgroundColor={bg}
            borderRadius={99}
          />
        ))}
      </View>

      <Text style={demoStyles.sub}>Border Radius</Text>
      <View style={demoStyles.row}>
        {[0, 8, 16, 99].map((r) => (
          <View key={r} style={demoStyles.cell}>
            <IconWrapper name="cube" size="lg" variant="filled" borderRadius={r} />
            <Text style={demoStyles.label}>r={r}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default IconWrapperDemo

const demoStyles = StyleSheet.create({
  container: {
    gap: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  cell: {
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
})
