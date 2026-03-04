export type ComponentCategory =
  | 'Primitives'
  | 'Forms'
  | 'Layout'
  | 'Navigation'
  | 'Feedback'
  | 'Typography'

export interface ComponentMeta {
  id: string
  title: string
  description: string
  category: ComponentCategory
  icon: string
}

export const COMPONENT_REGISTRY: ComponentMeta[] = [
  // Primitives
  {
    id: 'button',
    title: 'Button',
    description: 'Standard pressable button with variants',
    category: 'Primitives',
    icon: 'radio-button-on-outline',
  },
  {
    id: 'gradient-button',
    title: 'Gradient Button',
    description: 'Button with linear gradient background',
    category: 'Primitives',
    icon: 'color-wand-outline',
  },
  {
    id: 'badge',
    title: 'Badge',
    description: 'Status and count indicator labels',
    category: 'Primitives',
    icon: 'pricetag-outline',
  },
  {
    id: 'avatar',
    title: 'Avatar',
    description: 'User profile images with initials fallback',
    category: 'Primitives',
    icon: 'person-circle-outline',
  },
  {
    id: 'icon-wrapper',
    title: 'Icon Wrapper',
    description: 'Consistent sizing and color control for icons',
    category: 'Primitives',
    icon: 'star-outline',
  },
  {
    id: 'card',
    title: 'Card',
    description: 'Surface container for grouped content',
    category: 'Primitives',
    icon: 'albums-outline',
  },

  // Forms
  {
    id: 'input-outline',
    title: 'Input — Outline',
    description: 'Text field with bordered outline style',
    category: 'Forms',
    icon: 'create-outline',
  },
  {
    id: 'input-filled',
    title: 'Input — Filled',
    description: 'Text field with filled background style',
    category: 'Forms',
    icon: 'pencil-outline',
  },
  {
    id: 'search-bar',
    title: 'Search Bar',
    description: 'Dedicated search input with icon and clear',
    category: 'Forms',
    icon: 'search-outline',
  },

  // Layout
  {
    id: 'spacer',
    title: 'Spacer',
    description: 'Flexible spacing utility component',
    category: 'Layout',
    icon: 'resize-outline',
  },
  {
    id: 'divider',
    title: 'Divider',
    description: 'Horizontal and vertical separator lines',
    category: 'Layout',
    icon: 'remove-outline',
  },

  // Navigation
  {
    id: 'app-bar',
    title: 'App Bar',
    description: 'Top navigation bar with title and actions',
    category: 'Navigation',
    icon: 'menu-outline',
  },
  {
    id: 'filter-tabs',
    title: 'Filter Tabs',
    description: 'Scrollable tab bar for filtering content',
    category: 'Navigation',
    icon: 'options-outline',
  },

  // Feedback
  {
    id: 'bottom-sheet',
    title: 'Bottom Sheet',
    description: 'Draggable overlay panel with spring animation',
    category: 'Feedback',
    icon: 'layers-outline',
  },
  {
    id: 'empty-state',
    title: 'Empty State',
    description: 'Illustrated placeholder for empty content',
    category: 'Feedback',
    icon: 'file-tray-outline',
  },

  // Typography
  {
    id: 'text',
    title: 'Typography System',
    description: 'Typography scale, weights and styles',
    category: 'Typography',
    icon: 'text-outline',
  },
]

export const CATEGORIES = Array.from(
  new Set(COMPONENT_REGISTRY.map((c) => c.category)),
) as ComponentCategory[]
