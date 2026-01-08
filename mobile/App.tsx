import '@tamagui/polyfill-dev'
import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config' 
import { YStack, Text } from 'tamagui'

export default function App() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <YStack f={1} jc="center" ai="center" bc="$background">
        <Text color="black" fontSize={20}>Controll Med Mobile</Text>
      </YStack>
    </TamaguiProvider>
  )
}