import { makeAutoObservable } from 'mobx';

type FeedFilter = 'all' | 'free' | 'paid';

class UIStore {
  refreshing = false;
  feedFilter: FeedFilter = 'all';

  constructor() {
    makeAutoObservable(this);
  }

  setRefreshing(value: boolean) {
    this.refreshing = value;
  }

  setFeedFilter(filter: FeedFilter) {
    this.feedFilter = filter;
  }
}

export const uiStore = new UIStore();
export type { FeedFilter };