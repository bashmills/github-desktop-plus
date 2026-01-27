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

# Extract AppImage contents
cd "$(dirname "$APPIMAGE_FILE")"
chmod +x "$APPIMAGE_FILE"
"./$APPIMAGE_FILE" --appimage-extract

TAG="latest"  # https://github.com/AppImage/AppImageSpec/blob/master/draft.md#release-name-values
UPDATE_INFO="gh-releases-zsync|$REPO_OWNER|$REPO_NAME|$TAG|$RELEASES_ZSYNC_PATTERN"

curl -L -o appimagetool https://github.com/AppImage/appimagetool/releases/download/continuous/appimagetool-x86_64.AppImage
chmod +x appimagetool

# Embed update info and re-pack (this will generate the .zsync file)
./appimagetool -u "$UPDATE_INFO" squashfs-root "$APPIMAGE_FILE"

# Cleanup
rm -rf squashfs-root appimagetool
