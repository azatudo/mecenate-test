import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { colors } from '../../../shared/theme/colors';

export const ErrorCard = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/6134/6134065.png',
        }}
        style={styles.image}
      />

      <Text style={styles.title}>
        Не удалось загрузить публикации
      </Text>

      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Повторить</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    width: '100%',
    alignSelf: 'stretch',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  image: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },

  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },

  buttonText: {
    color: colors.background,
    fontWeight: '600',
  },
});