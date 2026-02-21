export function normalizePath(path: string): string {
  // Git expects forward slashes, even on Windows.
  // Also trim trailing slashes
  return path.replace(/\\/g, '/').replace(/\/+$/, '')
}
