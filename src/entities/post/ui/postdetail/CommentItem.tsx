import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

export const CommentItem = ({
  item,
}: any) => {
  return (
    <View style={styles.comment}>
      <View style={styles.header}>
        {item.author?.avatarUrl && (
          <Image
            source={{
              uri: item.author.avatarUrl,
            }}
            style={styles.avatar}
          />
        )}

        <Text style={styles.author}>
          {item.author?.displayName}
        </Text>
      </View>

      <Text style={styles.text}>
        {item.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  header: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 1,
    alignItems: 'center',
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  author: {
    fontWeight: '600',
  },

  text: {
    paddingLeft: 36,
    lineHeight: 20,
  },
});