GitHub Desktop Plus v3.5.6-alpha4

## **Changes and improvements:**

- The keyboard shortcut for showing Worktrees (`Ctrl+E`) now works even if worktrees are disabled in the Appearance settings. Thanks @devxoul!

- Added support for [GitLab subgroups](https://docs.gitlab.com/user/group/subgroups/). For example: `https://gitlab.com/my-org/subgroup/my-repo` will now be correctly parsed and displayed.

- Trying to undo an already pushed commit will now show a confirmation dialog. This change was made to avoid accidentally undoing commits when the user intended to *"Revert"* (create a new, opposite commit) instead of *"Undo"* (remove the last commit).

- When comparing two branches, the correct tab ("Ahead" or "Behind") is now selected by default based on the relationship between the branches.


## **Fixes:**

- Cloning repositories by URL is no longer broken.

- The "Checkout commit" and "Cherry pick" context menu items now work correctly when the commit list is filtered (by typing in the search box or by comparing branches).

- When comparing the current branch with another branch, dragging commits from the commit list onto the current branch will now trigger a cherry-pick operation instead of being ignored.
