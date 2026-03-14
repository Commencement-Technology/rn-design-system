import AppBar from '@/components/ui/app-bar'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TOPICS = [
  'Bug Report',
  'Feature Request',
  'Order Issue',
  'Payment Problem',
  'Delivery Feedback',
  'General Feedback',
  'Other',
]

export default function FeedbackScreen() {
  const [selectedTopic, setSelectedTopic] = useState('')
  const [message, setMessage] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const canSubmit = selectedTopic.length > 0 && message.length > 0

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppBar title="Feedback" showBackButton />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text style={styles.heading}>We'd love to hear from you</Text>
          <Text style={styles.subheading}>
            Your feedback helps us improve the shopping experience for everyone.
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Topic</Text>
          <Pressable
            style={[styles.dropdown, dropdownOpen && styles.dropdownOpen]}
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <Text style={[styles.dropdownText, !selectedTopic && styles.placeholder]}>
              {selectedTopic || 'Select a topic'}
            </Text>
            <Ionicons
              name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#94A3B8"
            />
          </Pressable>

          {dropdownOpen && (
            <View style={styles.dropdownMenu}>
              {TOPICS.map((topic, i) => (
                <Pressable
                  key={topic}
                  style={({ pressed }) => [
                    styles.dropdownItem,
                    i < TOPICS.length - 1 && styles.dropdownItemBorder,
                    pressed && styles.dropdownItemPressed,
                    selectedTopic === topic && styles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    setSelectedTopic(topic)
                    setDropdownOpen(false)
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedTopic === topic && styles.dropdownItemTextActive,
                    ]}
                  >
                    {topic}
                  </Text>
                  {selectedTopic === topic && (
                    <Ionicons name="checkmark" size={16} color="#6366F1" />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Tell us more details..."
            placeholderTextColor="#CBD5E1"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={18} color="#6366F1" />
          <Text style={styles.infoText}>
            Your feedback is reviewed by our team within 24 hours. We may reach out via your
            registered email if we need more information.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.submitBtn,
            !canSubmit && styles.submitBtnDisabled,
            pressed && canSubmit && styles.submitBtnPressed,
          ]}
          onPress={() => {}}
          disabled={!canSubmit}
        >
          <Ionicons name="send-outline" size={18} color="#FFFFFF" />
          <Text style={styles.submitText}>Send Feedback</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 20,
    gap: 20,
    paddingBottom: 48,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 21,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dropdownOpen: {
    borderColor: '#6366F1',
  },
  dropdownText: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '500',
  },
  placeholder: {
    color: '#CBD5E1',
    fontWeight: '400',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  dropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemPressed: {
    backgroundColor: '#F8FAFC',
  },
  dropdownItemActive: {
    backgroundColor: '#EEF2FF',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#475569',
  },
  dropdownItemTextActive: {
    color: '#6366F1',
    fontWeight: '600',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1E293B',
    minHeight: 140,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 14,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 15,
  },
  submitBtnDisabled: {
    backgroundColor: '#C7D2FE',
  },
  submitBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  submitText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
})
