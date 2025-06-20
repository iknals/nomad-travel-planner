// components/GapOptions.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
  gapStart: string;
  gapEnd: string;
  onSelect: (option: 'home' | 'add' | 'suggest') => void;
};

export default function GapOptions({ gapStart, gapEnd, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unplanned Time Detected</Text>
      <Text style={styles.subtitle}>
        {gapStart} → {gapEnd}
      </Text>
      <Text style={styles.description}>What would you like to do with this gap?</Text>

      <View style={styles.buttonSpacing}>
        <Button title="🏡 Go Home" onPress={() => onSelect('home')} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="➕ Add a Segment" onPress={() => onSelect('add')} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="✨ Get a Suggestion" onPress={() => onSelect('suggest')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 16,
    backgroundColor: '#fef8ec',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffe28a',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    marginBottom: 12,
  },
  buttonSpacing: {
    marginBottom: 10,
  },
});
