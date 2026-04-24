import { makeAutoObservable } from 'mobx';

class UIStore {
  refreshing = false;

  constructor() {
    makeAutoObservable(this);
  }

  setRefreshing(value: boolean) {
    this.refreshing = value;
  }
}

export const uiStore = new UIStore();