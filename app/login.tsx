import { supabase } from '@/lib/supabase';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) setSent(true);
  };

  return (
    <View style={{ padding: 24 }}>
      <Text>Email Login</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginVertical: 12 }}
      />
      <Button title="Send Login Link" onPress={handleLogin} />
      {sent && <Text>Check your email to log in.</Text>}
    </View>
  );
}
