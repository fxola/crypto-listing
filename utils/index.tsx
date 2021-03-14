export const formatNumber = (value: number) =>
  String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
