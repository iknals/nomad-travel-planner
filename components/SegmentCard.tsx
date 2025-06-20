import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  segment: {
    location: string;
    start_date: string | null;
    end_date: string | null;
    flexible: boolean;
    must_arrive_by?: string | null;
    can_leave_after?: string | null;
  };
};

export default function SegmentCard({ segment }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{segment.location}</Text>
      <Text>
        {segment.flexible
          ? `Arrive by ${segment.must_arrive_by}, Leave after ${segment.can_leave_after}`
          : `${segment.start_date} → ${segment.end_date}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, marginVertical: 6, backgroundColor: '#f8f8f8', borderRadius: 8 },
  title: { fontWeight: 'bold', fontSize: 16 },
});
