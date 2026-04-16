import { View } from 'react-native';
import { styles } from './PostCard.styles';

export const PostCardSkeleton = () => {
  return (
    <View style={styles.card}>

      {/* header */}
      <View style={styles.header}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: '#E5E5EA',
          }}
        />
        <View
          style={{
            width: 120,
            height: 14,
            borderRadius: 6,
            backgroundColor: '#E5E5EA',
          }}
        />
      </View>

      {/* image */}
      <View
        style={{
          width: '100%',
          height: 240,
          backgroundColor: '#E5E5EA',
        }}
      />

      {/* content */}
      <View style={styles.content}>
        <View
          style={{
            height: 16,
            width: '60%',
            backgroundColor: '#E5E5EA',
            borderRadius: 8,
            marginBottom: 8,
          }}
        />
        <View
          style={{
            height: 14,
            width: '100%',
            backgroundColor: '#E5E5EA',
            borderRadius: 8,
            marginBottom: 6,
          }}
        />
        <View
          style={{
            height: 14,
            width: '70%',
            backgroundColor: '#E5E5EA',
            borderRadius: 8,
          }}
        />
      </View>
    </View>
  );
};