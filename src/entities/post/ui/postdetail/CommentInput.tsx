import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

import { useState } from 'react';
import { usePostComment } from '../../model/usePostComment';
import { colors } from '../../../../shared/theme/colors';

export const CommentInput = ({
  postId,
}: {
  postId: string;
}) => {
  const [text, setText] =
    useState('');

  const {
    mutate: sendComment,
    isPending,
  } = usePostComment(postId);

  const handleSend = () => {
    if (!text.trim()) return;

    sendComment(text);
    setText('');
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Ваш комментарий..."
        placeholderTextColor={colors.muted}
      />

      <Pressable
        disabled={
          !text.trim() || isPending
        }
        onPress={handleSend}
        style={styles.button}
      >
        <Text style={styles.send}>
          ›
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  send: {
    color: '#fff',
    fontSize: 22,
  },
});