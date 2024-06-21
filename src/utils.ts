export function getDataTransferItemString(
  item: DataTransferItem
): Promise<string> {
  return new Promise((resolve) => {
    item.getAsString((data) => {
      resolve(data);
    });
  });
}
