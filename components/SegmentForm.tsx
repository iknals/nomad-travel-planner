import React, { useState } from 'react';
import { Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase';

type Props = {
  onSegmentAdded: () => void;
};

export default function SegmentForm({ onSegmentAdded }: Props) {
  const [location, setLocation] = useState('');
  const [flexible, setFlexible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [mustArriveBy, setMustArriveBy] = useState('');
  const [canLeaveAfter, setCanLeaveAfter] = useState('');

  const handleSubmit = async () => {
    const { error } = await supabase.from('segments').insert([
      {
        location,
        flexible,
        start_date: flexible ? null : startDate,
        end_date: flexible ? null : endDate,
        must_arrive_by: flexible ? mustArriveBy : null,
        can_leave_after: flexible ? canLeaveAfter : null,
        flight_info: null,
      },
    ]);

    if (error) {
      alert('Error saving segment');
    } else {
      alert('Segment added!');
      setLocation('');
      setStartDate('');
      setEndDate('');
      setMustArriveBy('');
      setCanLeaveAfter('');
      onSegmentAdded();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="e.g. Belize"
      />

      <Text>Flexible Dates?</Text>
      <Switch value={flexible} onValueChange={setFlexible} />

      {flexible ? (
        <>
          <Text>Must Arrive By:</Text>
          <TextInput
            style={styles.input}
            value={mustArriveBy}
            onChangeText={setMustArriveBy}
            placeholder="YYYY-MM-DD"
          />
          <Text>Can Leave After:</Text>
          <TextInput
            style={styles.input}
            value={canLeaveAfter}
            onChangeText={setCanLeaveAfter}
            placeholder="YYYY-MM-DD"
          />
        </>
      ) : (
        <>
          <Text>Start Date:</Text>
          <TextInput
            style={styles.input}
            value={startDate}
            onChangeText={setStartDate}
            placeholder="YYYY-MM-DD"
          />
          <Text>End Date:</Text>
          <TextInput
            style={styles.input}
            value={endDate}
            onChangeText={setEndDate}
            placeholder="YYYY-MM-DD"
          />
        </>
      )}

      <Button title="Save Segment" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
});

