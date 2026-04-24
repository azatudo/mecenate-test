import { StyleSheet } from 'react-native';
import { colors } from '../../../shared/theme/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    width: '100%',
    marginHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  author: {
    fontSize: 15,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 240,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    height: 36,
    borderRadius: 9999,
    backgroundColor: colors.border,
  },
  icon: {
    fontSize: 14,
  },
  count: {
    fontSize: 13,
    fontWeight: '500',
  },
  lockContainer: {
    position: 'relative',
    marginBottom: 8,
    width: '100%',
    height: 300,
    overflow: 'hidden',
    backgroundColor: colors.muted,
  },
  lockImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  lockIcon: {
    fontSize: 24,
  },
  lockTitle: {
    fontSize: 15,
    color: colors.background,
    fontWeight: '600',
  },
  lockSubtitle: {
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
  },
  lockButton: {
    marginTop: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  lockButtonText: {
    color: colors.background,
    fontSize: 13,
    fontWeight: '500',
  },
  skeletonTitle: {
    height: 16,
    width: '60%',
    backgroundColor: colors.border,
    borderRadius: 8,
    marginBottom: 8,
  },
  skeletonLine: {
    height: 14,
    width: '100%',
    backgroundColor: colors.border,
    borderRadius: 8,
    marginBottom: 6,
  },
  skeletonLineShort: {
    height: 14,
    width: '70%',
    backgroundColor: colors.border,
    borderRadius: 8,
  },
});