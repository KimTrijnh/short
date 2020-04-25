export interface Cache {
  get<Data>(key: string): Data | null;
  set<Data>(key: string, value: Data): void;
}
