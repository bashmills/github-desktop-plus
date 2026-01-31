#!/bin/bash

set -e

APPIMAGE_FILE="$1"
ARCH="$2"
if [ -z "$APPIMAGE_FILE" ] || [ -z "$ARCH" ]; then
  echo "Usage: $0 <AppImage file> <architecture>"
  exit 1
fi

REPO_OWNER="pol-rivero"
REPO_NAME="github-desktop-plus"
RELEASES_ZSYNC_PATTERN="GitHubDesktopPlus-*-linux-$ARCH.AppImage.zsync"

extract_appimage_noexec() {
  local f="$1"
  local outdir="$2"

  local offset
  offset="$(python3 - "$f" <<'PY'
import struct, sys
with open(sys.argv[1], "rb") as fp:
    h = fp.read(64)
bitness, endianness = struct.unpack("4x B B 58x", h)
fmt = (">" if endianness == 2 else "<") + (
    "40x Q 10x H H 2x" if bitness == 2 else "32x L 10x H H 14x"
)
shoff, shentsize, shnum = struct.unpack(fmt, h)
print(shoff + shentsize * shnum)
PY
)"

  rm -rf "$outdir"
  unsquashfs -o "$offset" -d "$outdir" "$f"
}


# Extract AppImage contents
cd "$(dirname "$APPIMAGE_FILE")"
APPIMAGE_FILE=$(basename "$APPIMAGE_FILE")
extract_appimage_noexec "$APPIMAGE_FILE" squashfs-root

TAG="latest"  # https://github.com/AppImage/AppImageSpec/blob/master/draft.md#release-name-values
UPDATE_INFO="gh-releases-zsync|$REPO_OWNER|$REPO_NAME|$TAG|$RELEASES_ZSYNC_PATTERN"

curl -L -o appimagetool https://github.com/AppImage/appimagetool/releases/download/continuous/appimagetool-x86_64.AppImage
chmod +x appimagetool

# Embed update info and re-pack (this will generate the .zsync file)
./appimagetool -u "$UPDATE_INFO" squashfs-root "$APPIMAGE_FILE"

# Cleanup
rm -rf squashfs-root appimagetool
