
/**
 * Browser-native speech synthesis does not provide raw audio buffers for local playback.
 * These utilities are kept for potential future expansion (e.g., recording browser speech).
 */
export function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
