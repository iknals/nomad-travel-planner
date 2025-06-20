// app/(tabs)/timeline.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { supabase } from '@/lib/supabase';
import GapOptions from '@/components/GapOptions';

type Segment = {
  id: string;
  location: string;
  start_date: string;
  end_date: string;
};

export default function TimelineScreen() {
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    const fetchSegments = async () => {
      const { data, error } = await supabase
        .from('segments')
        .select('*')
        .order('start_date', { ascending: true });

      if (data && !error) setSegments(data);
    };

    fetchSegments();
  }, []);

  const renderTimeline = () => {
    const items: React.ReactNode[] = [];

    for (let i = 0; i < segments.length; i++) {
      const current = segments[i];
      const next = segments[i + 1];

      // Render current segment
      items.push(
        <View key={current.id} style={{ padding: 12, backgroundColor: '#eef', marginVertical: 8, borderRadius: 8 }}>
          <Text style={{ fontWeight: 'bold' }}>{current.location}</Text>
          <Text>{current.start_date} → {current.end_date}</Text>
        </View>
      );

      // Check for gap
      if (next) {
        const end = new Date(current.end_date);
        const start = new Date(next.start_date);
        const gapInDays = (start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24);

        if (gapInDays > 1) {
          items.push(
            <GapOptions
              key={`gap-${current.id}-${next.id}`}
              gapStart={current.end_date}
              gapEnd={next.start_date}
              onSelect={(choice) => {
                if (choice === 'home') {
                  alert('Filling gap with home segment (to do)');
                } else if (choice === 'add') {
                  alert('Navigate to add segment form (to do)');
                } else {
                  alert('Trip suggestion coming soon!');
                }
              }}
            />
          );
        }
      }
    }

    return items;
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Your Timeline</Text>
      {renderTimeline()}
    </ScrollView>
  );
}
