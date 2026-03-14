import { Skeleton, SkeletonProfile, SkeletonText } from '@/components/ui/skeleton'
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const POSTS = [
  {
    id: '1',
    user: { name: 'Sofia Reyes', handle: '@sofiareyes', avatar: '🧑‍🎨' },
    image: '🌅',
    caption: 'Golden hour in Lisbon hits different every single time.',
    likes: 284,
    time: '2h ago',
    bg: '#FDF6EE',
  },
  {
    id: '2',
    user: { name: 'James Park', handle: '@jamespark', avatar: '👨‍💻' },
    image: '🌿',
    caption: 'Built something with React Native this weekend. Shipping soon!',
    likes: 471,
    time: '5h ago',
    bg: '#F0F7F4',
  },
  {
    id: '3',
    user: { name: 'Mia Chen', handle: '@miachen', avatar: '📸' },
    image: '🏙',
    caption: 'City walks are my meditation.',
    likes: 193,
    time: '1d ago',
    bg: '#EEF2F8',
  },
]

// --- Post Card ---

const PostCard = ({ post }: { post: (typeof POSTS)[0] }) => (
  <View style={[styles.postCard, { backgroundColor: post.bg }]}>
    {/* Author row */}
    <View style={styles.authorRow}>
      <View style={styles.avatarCircle}>
        <Text style={{ fontSize: 20 }}>{post.user.avatar}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.authorName}>{post.user.name}</Text>
        <Text style={styles.authorHandle}>
          {post.user.handle} · {post.time}
        </Text>
      </View>
      <Pressable hitSlop={8}>
        <Text style={styles.moreIcon}>···</Text>
      </Pressable>
    </View>

    {/* Image placeholder */}
    <View style={styles.postImage}>
      <Text style={{ fontSize: 60 }}>{post.image}</Text>
    </View>

    {/* Caption */}
    <Text style={styles.caption}>{post.caption}</Text>

    {/* Actions */}
    <View style={styles.actions}>
      <Pressable style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}>
        <Text style={styles.actionIcon}>♡</Text>
        <Text style={styles.actionCount}>{post.likes}</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}>
        <Text style={styles.actionIcon}>💬</Text>
        <Text style={styles.actionCount}>Reply</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}>
        <Text style={styles.actionIcon}>↗</Text>
        <Text style={styles.actionCount}>Share</Text>
      </Pressable>
    </View>
  </View>
)

// --- Skeleton Feed ---

const SkeletonFeed = () => (
  <>
    {/* Profile header skeleton */}
    <View style={styles.profileSection}>
      <SkeletonProfile />
    </View>

    {/* Feed cards skeleton */}
    {[1, 2, 3].map((i) => (
      <View key={i} style={styles.skeletonCard}>
        {/* Author */}
        <View style={styles.authorRow}>
          <Skeleton width={40} height={40} borderRadius={20} />
          <View style={{ flex: 1, gap: 7 }}>
            <SkeletonText width="45%" />
            <SkeletonText width="30%" />
          </View>
        </View>
        {/* Image block */}
        <Skeleton width="100%" height={180} borderRadius={12} style={{ marginVertical: 12 }} />
        {/* Caption lines */}
        <SkeletonText width="90%" />
        <View style={{ height: 7 }} />
        <SkeletonText width="60%" />
        {/* Actions */}
        <View style={[styles.actions, { marginTop: 14 }]}>
          <Skeleton width={60} height={14} borderRadius={6} />
          <Skeleton width={60} height={14} borderRadius={6} />
          <Skeleton width={50} height={14} borderRadius={6} />
        </View>
      </View>
    ))}
  </>
)

// --- Main Demo ---

export default function SkeletonDemo() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const t = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(t)
  }, [])

  const reload = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2800)
  }

  return (
    <>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Feed</Text>
        <Pressable
          onPress={reload}
          style={({ pressed }) => [styles.reloadBtn, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.reloadText}>↺ Reload</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {loading ? (
          <SkeletonFeed />
        ) : (
          <>
            {/* Real profile */}
            <View style={styles.profileSection}>
              <View style={styles.realProfile}>
                <Text style={{ fontSize: 48 }}>🧑‍🎨</Text>
                <Text style={styles.realName}>Sofia Reyes</Text>
                <Text style={styles.realHandle}>@sofiareyes · Lisbon, PT</Text>
                <View style={styles.statsRow}>
                  {[
                    ['284', 'Posts'],
                    ['12.4k', 'Followers'],
                    ['890', 'Following'],
                  ].map(([n, l]) => (
                    <View key={l} style={styles.stat}>
                      <Text style={styles.statNum}>{n}</Text>
                      <Text style={styles.statLabel}>{l}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            {POSTS.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </>
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  topBarTitle: { fontSize: 20, fontWeight: '800', color: '#1C1C1E' },
  reloadBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
  },
  reloadText: { fontSize: 13, fontWeight: '600', color: '#555' },
  scroll: { padding: 16, paddingBottom: 40 },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
  },

  skeletonCard: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 14 },

  // Real profile
  realProfile: { alignItems: 'center', paddingVertical: 24 },
  realName: { fontSize: 20, fontWeight: '700', color: '#1C1C1E', marginTop: 10 },
  realHandle: { fontSize: 13, color: '#999', marginTop: 3 },
  statsRow: { flexDirection: 'row', gap: 28, marginTop: 16 },
  stat: { alignItems: 'center' },
  statNum: { fontSize: 17, fontWeight: '700', color: '#1C1C1E' },
  statLabel: { fontSize: 12, color: '#999', marginTop: 2 },

  // Post card
  postCard: { borderRadius: 18, padding: 16, marginBottom: 14 },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorName: { fontSize: 14, fontWeight: '700', color: '#1C1C1E' },
  authorHandle: { fontSize: 12, color: '#999', marginTop: 1 },
  moreIcon: { fontSize: 18, color: '#999', letterSpacing: 1 },
  postImage: {
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  caption: { fontSize: 14, color: '#3C3C43', lineHeight: 20, fontWeight: '400' },
  actions: { flexDirection: 'row', gap: 20, marginTop: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionIcon: { fontSize: 16, color: '#666' },
  actionCount: { fontSize: 13, color: '#666', fontWeight: '500' },
})
