import AvatarDemo from '@/demos/avatar'
import BadgeDemo from '@/demos/badge'
import BottomSheetDemo from '@/demos/bottom-sheet'
import ButtonDemo from '@/demos/button'
import DividerDemo from '@/demos/divider'
import EmptyStateDemo from '@/demos/empty-state'
import FilterTabsDemo from '@/demos/filter-tab'
import GradientButtonDemo from '@/demos/gradient-button'
import IconWrapperDemo from '@/demos/icon-wrapper'
import InputDemo from '@/demos/input'
import SpacerDemo from '@/demos/spacer'
import TypographyScreen from '@/demos/typography-system'
import AppBarScreen from '@/screens/app-bar/app-bar-screen'
import CoffeeShopScreen from '@/screens/coffee-shop/coffee-shop-screen'
import LoginScreen from '@/screens/login/login-screen'
import SearchDemoScreen from '@/screens/search-demo-screen'
import { ComponentType } from 'react'

export const DEMO_MAP: Record<string, ComponentType> = {
  button: ButtonDemo,
  'gradient-button': GradientButtonDemo,
  'input-outline': InputDemo,
  'input-filled': LoginScreen,
  spacer: SpacerDemo,
  divider: DividerDemo,
  'filter-tabs': FilterTabsDemo,
  'bottom-sheet': BottomSheetDemo,
  'empty-state': EmptyStateDemo,
  'icon-wrapper': IconWrapperDemo,
  avatar: AvatarDemo,
  badge: BadgeDemo,
  card: CoffeeShopScreen,
  text: TypographyScreen,
  'app-bar': AppBarScreen,
  'search-bar': SearchDemoScreen,
}
