import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * @param {import.meta} meta
 */

export function useESMContext(meta) {
  const __filename = fileURLToPath(meta.url);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
}
