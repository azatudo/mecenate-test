import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
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
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#333',
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
    backgroundColor: '#EFEFF4',
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
    backgroundColor: '#999',
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
  lockContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  lockIcon: {
    fontSize: 24,
  },
  lockTitle: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  lockSubtitle: {
    fontSize: 12,
    color: '#ddd',
    textAlign: 'center',
  },
  lockButton: {
    marginTop: 12,
    backgroundColor: '#6C2BD9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  lockButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  skeletonTitle: {
    height: 16,
    width: '60%',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    marginBottom: 8,
  },
  skeletonLine: {
    height: 14,
    width: '100%',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    marginBottom: 6,
  },
  skeletonLineShort: {
    height: 14,
    width: '70%',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
  },
});