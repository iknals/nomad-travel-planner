import { supabase } from '@/lib/supabase';
import { router } from 'expo-router'; // 👈 only needed if using Expo Router
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function ProfileScreen() {
  const [homeBase, setHomeBase] = useState('');
  const [currency, setCurrency] = useState('');
  const [visited, setVisited] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [countryInput, setCountryInput] = useState('');
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        setHomeBase(data.home_base || '');
        setCurrency(data.currency || '');
        setVisited(data.countries_visited || []);
        setWishlist(data.countries_wishlist || []);
      }
    };

    loadProfile();
  }, []);

  const handleAddCountry = () => {
    if (!countryInput.trim()) return;
    if (isWishlist) {
      setWishlist([...wishlist, countryInput.trim()]);
    } else {
      setVisited([...visited, countryInput.trim()]);
    }
    setCountryInput('');
  };

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      home_base: homeBase,
      currency,
      countries_visited: visited,
      countries_wishlist: wishlist,
    });

    if (error) alert('Error saving profile');
    else alert('Profile saved!');
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Logout failed');
    } else {
      alert('Logged out');
      router.replace('/login'); // 👈 only works if using Expo Router
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Set up your profile</Text>

      <Text>Home Base</Text>
      <TextInput value={homeBase} onChangeText={setHomeBase} placeholder="e.g. Toronto" style={{ borderWidth: 1, marginBottom: 10 }} />

      <Text>Preferred Currency</Text>
      <TextInput value={currency} onChangeText={setCurrency} placeholder="e.g. CAD" style={{ borderWidth: 1, marginBottom: 10 }} />

      <Text>{isWishlist ? 'Wishlist Country' : 'Visited Country'}</Text>
      <TextInput
        value={countryInput}
        onChangeText={setCountryInput}
        placeholder="e.g. Japan"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title={`Add to ${isWishlist ? 'Wishlist' : 'Visited'}`} onPress={handleAddCountry} />
      <Button title={`Switch to ${!isWishlist ? 'Wishlist' : 'Visited'} Mode`} onPress={() => setIsWishlist(!isWishlist)} />

      <Text style={{ marginTop: 16 }}>Visited: {visited.join(', ')}</Text>
      <Text>Wishlist: {wishlist.join(', ')}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Save Profile" onPress={handleSave} />
      </View>

      {/* 🔓 Logout Button */}
      <View style={{ marginTop: 20 }}>
        <Button title="Log Out" onPress={handleLogout} />
      </View>
    </View>
  );
}
