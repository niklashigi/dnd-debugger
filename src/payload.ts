export interface Payload {
  label: string;
  data: {
    contentType: string;
    data: string;
  }[];
}
