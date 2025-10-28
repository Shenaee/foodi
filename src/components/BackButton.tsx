import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
      <Text style={{ fontSize: 16 }}>← Back</Text>
    </TouchableOpacity>
  );
}
