import SegmentCard from '@/components/SegmentCard';
import { supabase } from '@/lib/supabase';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';

type Segment = {
  id: string;
  location: string;
  start_date: string | null;
  end_date: string | null;
  flexible: boolean;
};

export default function TimelineScreen() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('segments').select('*').order('start_date', { ascending: true });
      if (data) setSegments(data);
    };

    fetch();
  }, []);

  useEffect(() => {
    const today = dayjs();
    const index = segments.findIndex((s) => {
      if (!s.start_date || !s.end_date) return false;
      return dayjs(s.start_date).isBefore(today) && dayjs(s.end_date).isAfter(today);
    });

    if (index >= 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }, 500);
    }
  }, [segments]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={segments}
        renderItem={({ item }) => <SegmentCard segment={item} />}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({ length: 100, offset: 100 * index, index })}
      />
    </SafeAreaView>
  );
}
