export type RecordWithAnyData = Record<string, string | any>;

export interface ChangeEvent {
  name: string;
  value: string | number;
}
