# GitHub Desktop Plus

This is an **up-to-date** fork of [GitHub Desktop](https://desktop.github.com) with additional features and improvements.

> [!IMPORTANT]
> This is a community-maintained project. It **is not** an official GitHub product. 

<img src="docs/assets/github-desktop-plus-demo.webp" alt="Demo" style="max-width:1000px;">

## Highlights
| <h4>Commit history search</h4> | <h4>Multiple stashes per branch</h4> |
| :---: | :---: |
| ![Commit search](docs/assets/github-desktop-plus-demo-search.webp) | ![Multiple stashes](docs/assets/github-desktop-plus-demo-stashes.webp) |
| <h4>Indicator for missing branches in the remote</h4> | <h4>Buttons optimized for visual recognition</h4> |
| ![Push indicator](docs/assets/github-desktop-plus-demo-push-indicator.webp) | ![Stash header](docs/assets/github-desktop-plus-demo-stash-header.webp) |
| <h4>Bitbucket & GitLab integration</h4> | <h4>Indicator for merge commits</h4> |
| ![Bitbucket integration](docs/assets/github-desktop-plus-demo-bitbucket-integration.webp) | ![Merge commits](docs/assets/github-desktop-plus-demo-merge-commits.webp) |

## Additional Features in GitHub Desktop Plus

### General:

- Red color for destructive action buttons.
- Add **icons** to some similar-looking buttons for faster visual recognition.
- Allow generating **branch name presets** by calling an external script (e.g. fetching ticket numbers from an issue tracker). [Click here for more details](docs/branch-name-presets.md).
- Allow using a **different text editor for a given repo**, by overriding it in the repository settings.
- **Bitbucket** and **GitLab** integration:
  - Preview and create pull requests.
  - View pull requests status, including checks.
  - Display a commit or PR in Bitbucket/GitLab (web browser).
  - Correctly set repository owner (instead of displaying "Other").

### Repositories list:

- "**Pull all**" button to fetch and pull all your repositories at once.
- Allow **hiding** the "**Recent**" repositories section.
- Allow customizing the repository **groups** to better organize your repositories (right click on a repository and select "Change group name").

### Branches list:

- Add warning indicator to **local-only branches** (branches that have not been pushed to the remote, or that have been deleted automatically after a PR).
- Allow manually setting which is the **default branch** for a repository (even if it doesn't match the one configured in the remote).

### History tab:

- **Search commits** by title, message, tag, or hash.
- Use a different font style for **merge commits** in order to make them visually distinct, since most of the time they are not as relevant.
- If a commit modifies only 1 file, allow double-clicking the commit to open the file. For other commits, you can still double-click the file as usual.

### Changes tab:

- Context menu option to **permanently discard changes** without sending to trash (useful when the there are many changed files and the regular "Discard" is extremely slow).

## Download and Installation

### Arch Linux / Manjaro (AUR)

<details>
<summary>Click to expand</summary>

Simply install `github-desktop-plus-bin` from the AUR.

You can also build from source by installing `github-desktop-plus` or `github-desktop-plus-git` from the AUR.

> `gnome-keyring` is required and the daemon must be launched either at login or when the X server / Wayland compositor is started. Normally this is handled by a display manager, but in other cases following the instructions found on the [Arch Wiki](https://wiki.archlinux.org/index.php/GNOME/Keyring#Using_the_keyring_outside_GNOME) will fix the issue of not being able to save login credentials.

</details>

### Debian / Ubuntu / Linux Mint / Pop!_OS / Zorin OS (APT)

<details>

<summary>Click to expand</summary>

Create the repository file:

```bash
sudo curl https://gpg.polrivero.com/public.key | sudo gpg --dearmor -o /usr/share/keyrings/polrivero.gpg
echo "deb [signed-by=/usr/share/keyrings/polrivero.gpg] https://deb.github-desktop.polrivero.com/ stable main" | sudo tee /etc/apt/sources.list.d/github-desktop-plus.list
```

Update the package list and install:
```bash
sudo apt update
sudo apt install github-desktop-plus
```

</details>


### Fedora / RHEL / CentOS (RPM)

<details>
<summary>Click to expand</summary>

Create the repository file:

```bash
sudo rpm --import https://gpg.polrivero.com/public.key
echo -e "[github-desktop-plus]\nname=GitHub Desktop Plus\nbaseurl=https://rpm.github-desktop.polrivero.com/\nenabled=1\ngpgcheck=1\nrepo_gpgcheck=1\ngpgkey=https://gpg.polrivero.com/public.key" | sudo tee /etc/yum.repos.d/github-desktop-plus.repo
```

Update the package list and install:

```bash
sudo dnf check-update
sudo dnf install github-desktop-plus
```

</details>


### Flatpak (any distro)

<details>
<summary>Click to expand</summary>

You can install GitHub Desktop Plus from Flathub by following the instructions at https://flathub.org/en/apps/io.github.pol_rivero.github-desktop-plus or by running the following command:

```bash
flatpak install flathub io.github.pol_rivero.github-desktop-plus
```

</details>

### AppImage (any distro, not recommended)

<details>
<summary>Click to expand</summary>

Download the AppImage from the [releases page](https://github.com/pol-rivero/github-desktop-plus/releases/latest) and make it executable:

```bash
chmod +x GitHub-Desktop-Plus-*-linux-*.AppImage
# Just double-click the file to run it
```

| **64-bit x86** | **64-bit ARM** |
| --- | --- |
| `-linux-x86_64.AppImage` | `-linux-arm64.AppImage` |

</details>

### Windows

<details>
<summary>Click to expand</summary>

Download and execute the installer from the [releases page](https://github.com/pol-rivero/github-desktop-plus/releases/latest).

| | **64-bit x86** | **64-bit ARM** |
| --- | --- | --- |
| **.EXE Installer** | `-win-x64.exe` | `-win-arm64.exe` |
| **.MSI Installer** | `-win-x64.msi` | `-win-arm64.msi` |

</details>

### macOS

<details>
<summary>Click to expand</summary>

Download and extract the ZIP file from the [releases page](https://github.com/pol-rivero/github-desktop-plus/releases/latest). Click the app file to run it.  
If you encounter the error "Apple could not verify this app is free of malware", go to "System Settings" > "Privacy & Security", scroll down to "Security" and click "Open Anyway" on "GitHub Desktop Plus".

| **64-bit x86** | **64-bit ARM (Apple Silicon)** |
| --- | --- |
| `-macOS-x64.zip` | `-macOS-arm64.zip` |

</details>

## Running the app locally

### From the terminal

```bash
corepack enable  # Install yarn if needed
yarn             # Install dependencies
yarn build:dev   # Initial build
yarn start       # Start the app for development and watch for changes
```

- It's normal for the app to take a while to start up, especially the first time.

- While starting up, this error is normal: `UnhandledPromiseRejectionWarning: Error: Invalid header: Does not start with Cr24`

- You don't need to restart the app to apply changes. Just reload the window (`Ctrl + Alt + R` / `Cmd + Alt + R`).

- Changes to the code inside `main-process` do require a full rebuild. Stop the app and run `yarn build:dev` again.

- [Read this document](docs/contributing/setup.md) for more information on how to set up your development environment.

### From VSCode

The first time you open the project, install the dependencies by running:
```bash
corepack enable
yarn
```

Then, you can simply build and run the app by pressing `F5`.  
Breakpoints should be set in the developer tools, not the VSCode editor.

### Running tests

I recommend running the tests in a Docker container for reproducibility and to avoid conflicts with your git configuration.  
After installing the dependencies with `yarn`, make sure you have Docker installed and run:

```bash
yarn test:docker
```

## Why this fork?

First of all, because shiftkey's fork is currently unmaintained (last commit was in February 2025), so it's not getting the latest features and fixes from the official GitHub Desktop repository.

Secondly, I think the official GitHub Desktop app is very slow in terms of updates and lacks some advanced features that I'd like. This fork has low code quality requirements compared to the official repo, so I (and hopefully you as well) can add features and improvements quickly.  
This fork also focuses on integrating nicely with Bitbucket, since I use it for work and haven't found a good Linux GUI client for it.

Keep in mind that this version is not endorsed by GitHub, and it's aimed at power users with technical knowledge. If you're looking for a polished and stable product, I recommend using the official GitHub Desktop app instead.
