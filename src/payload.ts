export interface Payload {
  id: string;
  label: string;
  data: {
    contentType: string;
    data: string;
  }[];
}
