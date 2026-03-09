import { ScrollView, StyleSheet, Text, View } from 'react-native'
import IconWrapper, { IconSize, IconVariant } from '../components/ui/icon-wrapper'

function IconWrapperDemo() {
  return (
    <ScrollView contentContainerStyle={demoStyles.container} showsVerticalScrollIndicator={false}>
      <View style={demoStyles.pageHeader}>
        <Text style={demoStyles.heading}>Icon Wrapper</Text>
        <Text style={demoStyles.pageSubtitle}>
          Themed icon containers with optional press interaction
        </Text>
      </View>

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
            name="flashlight"
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

      <Text style={demoStyles.sub}>Pressable</Text>
      <View style={demoStyles.row}>
        {(
          [
            { name: 'heart-outline', variant: 'default' },
            { name: 'bookmark-outline', variant: 'outlined' },
            { name: 'share-social-outline', variant: 'filled' },
            { name: 'ellipsis-horizontal', variant: 'ghost' },
          ] as { name: any; variant: IconVariant }[]
        ).map(({ name, variant }) => (
          <View key={name} style={demoStyles.cell}>
            <IconWrapper name={name} size="md" variant={variant} onPress={() => {}} />
            <Text style={demoStyles.label}>{variant}</Text>
          </View>
        ))}
      </View>
      <Text style={demoStyles.note}>
        Pass <Text style={demoStyles.code}>onPress</Text> to enable a spring scale animation on tap.
        Without it the component renders a plain non-interactive view.
      </Text>
    </ScrollView>
  )
}

export default IconWrapperDemo

const demoStyles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 32,
  },
  pageHeader: {
    gap: 4,
    marginBottom: 4,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '400',
  },
  sub: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
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
  note: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
  },
  code: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: '#6366F1',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
})
