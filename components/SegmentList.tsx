import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from '../lib/supabase';

type Segment = {
  id: string;
  location: string;
  flexible: boolean;
  start_date: string | null;
  end_date: string | null;
  must_arrive_by: string | null;
  can_leave_after: string | null;
};

type Props = {
  refreshTrigger: number;
};

export default function SegmentList({ refreshTrigger }: Props) {
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    const fetchSegments = async () => {
      const { data, error } = await supabase
        .from('segments')
        .select('*')
        .order('start_date', { ascending: true });

      if (!error && data) {
        setSegments(data);
      }
    };

    fetchSegments();
  }, [refreshTrigger]);

  return (
    <View>
      <Text style={styles.header}>Your Segments</Text>
      {segments.map((seg) => (
        <View key={seg.id} style={styles.segment}>
          <Text style={styles.location}>{seg.location}</Text>
          {seg.flexible ? (
            <Text>
              Arrive by {seg.must_arrive_by}, Leave after {seg.can_leave_after}
            </Text>
          ) : (
            <Text>
              {seg.start_date} → {seg.end_date}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  segment: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  location: {
    fontWeight: '600',
    fontSize: 16,
  },
});
