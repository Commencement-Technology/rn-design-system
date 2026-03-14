import Toast, { ToastType } from '@/components/ui/toast'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

interface ToastState {
  visible: boolean
  message: string
  type: ToastType
  action?: { label: string; onPress: () => void }
}

const PRODUCTS = [
  { id: '1', name: 'Merino Wool Sweater', price: '$89', color: '#F5EFE6', emoji: '🧥' },
  { id: '2', name: 'Leather Sneakers', price: '$124', color: '#EEF2F7', emoji: '👟' },
  { id: '3', name: 'Linen Trousers', price: '$64', color: '#F0F5EE', emoji: '👖' },
]

export default function ToastDemo() {
  const [cart, setCart] = useState<string[]>([])
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info',
  })

  const showToast = (t: Omit<ToastState, 'visible'>) => {
    // Reset then show (handles rapid taps)
    setToast({ visible: false, ...t })
    setTimeout(() => setToast({ visible: true, ...t }), 50)
  }

  const handleAddToCart = (id: string, name: string) => {
    if (cart.includes(id)) {
      showToast({
        message: `${name} is already in your cart.`,
        type: 'warning',
      })
      return
    }
    setCart((c) => [...c, id])
    showToast({
      message: `${name} added to cart!`,
      type: 'success',
      action: {
        label: 'View Cart',
        onPress: () => console.log('Navigate → Cart'),
      },
    })
  }

  const handleRemoveFromCart = (id: string, name: string) => {
    setCart((c) => c.filter((i) => i !== id))
    showToast({
      message: `${name} removed.`,
      type: 'info',
      action: {
        label: 'Undo',
        onPress: () => setCart((c) => [...c, id]),
      },
    })
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast({ message: 'Your cart is empty.', type: 'error' })
      return
    }
    showToast({ message: 'Order placed successfully! 🎉', type: 'success' })
    setCart([])
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shop</Text>
          <View style={styles.cartBadgeWrap}>
            <Text style={styles.headerIcon}>🛍</Text>
            {cart.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cart.length}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Product Cards */}
        <Text style={styles.sectionLabel}>New Arrivals</Text>
        {PRODUCTS.map((p) => {
          const inCart = cart.includes(p.id)
          return (
            <View key={p.id} style={[styles.card, { backgroundColor: p.color }]}>
              <View style={styles.cardEmoji}>
                <Text style={{ fontSize: 40 }}>{p.emoji}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.productName}>{p.name}</Text>
                <Text style={styles.productPrice}>{p.price}</Text>
              </View>
              <View style={styles.cardActions}>
                {inCart ? (
                  <Pressable
                    style={({ pressed }) => [styles.removeBtn, pressed && { opacity: 0.7 }]}
                    onPress={() => handleRemoveFromCart(p.id, p.name)}
                  >
                    <Text style={styles.removeBtnText}>Remove</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.75 }]}
                    onPress={() => handleAddToCart(p.id, p.name)}
                  >
                    <Text style={styles.addBtnText}>Add to Cart</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )
        })}

        {/* Checkout */}
        <Pressable
          style={({ pressed }) => [styles.checkoutBtn, pressed && { opacity: 0.8 }]}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>
            Checkout {cart.length > 0 ? `(${cart.length})` : ''}
          </Text>
        </Pressable>

        {/* Network error demo */}
        <Pressable
          style={({ pressed }) => [styles.ghostBtn, pressed && { opacity: 0.6 }]}
          onPress={() =>
            showToast({ message: 'No internet connection. Please try again.', type: 'error' })
          }
        >
          <Text style={styles.ghostBtnText}>Simulate Network Error</Text>
        </Pressable>
      </ScrollView>

      {/* Toast — rendered outside ScrollView so it floats */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        position="bottom"
        action={toast.action}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  )
}

const styles = StyleSheet.create({
  screen: { paddingBottom: 60 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#1C1C1E', letterSpacing: -0.5 },
  headerIcon: { fontSize: 24 },
  cartBadgeWrap: { position: 'relative' },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 10, color: '#fff', fontWeight: '700' },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  cardEmoji: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1 },
  productName: { fontSize: 15, fontWeight: '600', color: '#1C1C1E', marginBottom: 4 },
  productPrice: { fontSize: 13, fontWeight: '500', color: '#666' },
  cardActions: {},
  addBtn: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
  },
  addBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  removeBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  removeBtnText: { color: '#666', fontSize: 13, fontWeight: '600' },
  checkoutBtn: {
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.2 },
  ghostBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  ghostBtnText: { color: '#999', fontSize: 14, fontWeight: '500' },
})
