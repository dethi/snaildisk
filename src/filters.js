export function humanizeSize(bytes) {
  let size = bytes;

  if (Math.abs(size) < 1024) {
    return `${size} B`;
  }
  const units = ['kB', 'MB', 'GB', 'TB'];
  let u = -1;
  do {
    size /= 1024;
    u += 1;
  } while (Math.abs(size) >= 1024 && u < units.length - 1);
  return `${size.toFixed(1)} ${units[u]}`;
}
