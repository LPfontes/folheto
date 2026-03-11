import { create } from 'zustand'

export interface Product {
  id: string
  name: string
  oldPrice: string
  price: string
  unit?: string
  badge?: string
  image?: string
}

interface PamphletState {
  title: string
  storeName: string
  storeCategory: string
  products: Product[]
  themeColor: string
  disclaimer: string
  deliveryText: string
  social: string
  address: string
  phone: string
  backgroundImage: string | null
  logoImage: string | null
  // Actions
  setTitle: (title: string) => void
  setStoreName: (name: string) => void
  setStoreCategory: (category: string) => void
  setProducts: (products: Product[]) => void
  setThemeColor: (color: string) => void
  setDisclaimer: (text: string) => void
  setDeliveryText: (text: string) => void
  setSocial: (text: string) => void
  setAddress: (text: string) => void
  setPhone: (text: string) => void
  setBackgroundImage: (url: string | null) => void
  setLogoImage: (url: string | null) => void
}

const defaultProducts: Product[] = [
  { id: '1', name: 'Tododia Sab. Barra Morango ou Noz Pecã 5x90g', oldPrice: 'R$ 34,90', price: 'R$ 29,90', unit: 'cada' },
  { id: '2', name: 'Tododia Creme Corporal 200ml (consult. fragrâncias)', oldPrice: 'R$ 56,90', price: 'R$ 29,99', unit: 'cada' },
  { id: '3', badge: 'NEW', name: 'Kit Tododia Morango ou Caju Hidra+Body Splash', oldPrice: 'R$ 172,80', price: 'R$ 93,80' },
  { id: '4', badge: 'NEW', name: 'Kit Siage Volume Imediato (3 itens)', oldPrice: 'R$ 169,99', price: 'R$ 109,99' },
  { id: '5', name: 'Niina Secrets Hidra Balm Rosa', oldPrice: 'R$ 42,99', price: 'R$ 19,99' },
  { id: '6', name: 'MAKIÊ Batom Bastão 8h', oldPrice: 'R$ 39,99', price: 'R$ 29,99' },
  { id: '7', name: 'AVON ColorTrend Matte Real Pó Compacto', oldPrice: 'R$ 24,99', price: 'R$ 19,99' },
  { id: '8', name: 'Ruby Rose Blow Iluminador Duo Such', oldPrice: 'R$ 34,99', price: 'R$ 24,99' },
  { id: '9', name: 'QDB Jelly Tint Blush Fresh Bordo/Coral', oldPrice: 'R$ 54,90', price: 'R$ 29,99' },
  { id: '10', name: 'Una Corretivo Cob Extrema', oldPrice: 'R$ 62,90', price: 'R$ 49,90', unit: 'cada' },
  { id: '11', name: 'QDB Base Líquida Alta Cobertura 30ml', oldPrice: 'R$ 79,99', price: 'R$ 59,99' },
  { id: '12', name: 'BOTI Make B Base Pó Mineral', oldPrice: 'R$ 129,90', price: 'R$ 69,90' },
]

export const usePamphletStore = create<PamphletState>((set) => ({
  title: 'MÊS DO CONSUMIDOR ATÉ 50% OFF',
  storeName: 'SER+BELEZA',
  storeCategory: 'PERFUMES & MAKES',
  products: defaultProducts,
  themeColor: '#e3242b',
  disclaimer: 'Ofertas válidas até 31/03/2026 ou enquanto durar o estoque.',
  deliveryText: 'FAZEMOS DELIVERY!',
  social: '@sermaisbeleza',
  address: 'Rua da Hora, 456 Loja 05',
  phone: 'Televendas: (81)99742-2340',
  backgroundImage: null,
  logoImage: null,

  setTitle: (title) => set({ title }),
  setStoreName: (storeName) => set({ storeName }),
  setStoreCategory: (storeCategory) => set({ storeCategory }),
  setProducts: (products) => set({ products }),
  setThemeColor: (themeColor) => set({ themeColor }),
  setDisclaimer: (disclaimer) => set({ disclaimer }),
  setDeliveryText: (deliveryText) => set({ deliveryText }),
  setSocial: (social) => set({ social }),
  setAddress: (address) => set({ address }),
  setPhone: (phone) => set({ phone }),
  setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
  setLogoImage: (logoImage) => set({ logoImage }),
}))
