import { createAnimations } from '@tamagui/animations-react-native'
import { createTamagui, createFont } from 'tamagui'
import { config } from '@tamagui/config/v3'

// Configuração de animações (obrigatório para vários componentes)
const animations = createAnimations({
  fast: {
    type: 'spring',
    damping: 20,
    stiffness: 250,
  },
  medium: {
    type: 'spring',
    damping: 10,
    stiffness: 100,
  },
})

const tamaguiConfig = createTamagui({
  ...config,
  animations,
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig