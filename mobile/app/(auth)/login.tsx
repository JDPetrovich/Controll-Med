import React, { useState } from 'react'
import { YStack, XStack, Text, Input, Button, H2 } from 'tamagui'
import { Lock, Mail, Eye, EyeOff } from '@tamagui/lucide-icons'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <YStack style={{ flex: 1, justifyContent: "center", padding: 16, gap: 20 }}>
      
      <YStack style={{ gap: 8 }}>
        <H2 style={{ fontWeight: "800" }}>Controll Med</H2>
        <Text>Entre para gerenciar seus medicamentos</Text>
      </YStack>

      <YStack style={{ gap: 16 }}>
        
        <XStack style={{ alignItems: "center", borderRadius: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: "#ccc" }}>
          <Mail size={20} />
          <Input 
            placeholder="Seu e-mail" 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ flex: 1, borderWidth: 0, backgroundColor: "transparent" }}
          />
        </XStack>

        <XStack style={{ alignItems: "center", borderRadius: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: "#ccc" }}>
          <Lock size={20} />
          <Input 
            placeholder="Sua senha" 
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={{ flex: 1, borderWidth: 0, backgroundColor: "transparent" }}
          />
          <Button 
            chromeless 
            onPress={() => setShowPassword(!showPassword)}
            style={{ padding: 8 }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        </XStack>

        <Button 
          themeInverse 
          size="$4" 
          onPress={() => console.log(email)}
          style={{ fontWeight: "bold" }}
        >
          Entrar
        </Button>
      </YStack>
    </YStack>
  )
}