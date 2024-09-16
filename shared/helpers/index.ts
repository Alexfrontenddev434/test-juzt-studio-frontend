export const isDevMode = process.env.NODE_ENV !== 'production';

export class ToggleSet {
  public set: Set<any>;

  constructor(set = new Set()) {
    this.set = set;
  }

  private add(value: any) {
    this.set.add(value);
  }

  private delete(value: any) {
    this.set.delete(value);
  }

  toggle(value: any) {
    if (this.set.has(value)) {
      this.set.delete(value);
    } else {
      this.set.add(value);
    }
  }

  has(value: any) {
    return this.set.has(value);
  }
}

export const getProductsPayload = (pageNumberArg: any) => ({
  page: pageNumberArg || 1,
  limit: 10,
  sort: 'desc',
  order: 'year',
  filtersColor: [],
  filtersModel: [],
});
