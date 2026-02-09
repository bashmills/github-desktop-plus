import * as Path from 'path'

import { IMenuItem } from '../../lib/menu-item'
import { clipboard } from 'electron'

interface IWorktreeContextMenuConfig {
  readonly path: string
  readonly isMainWorktree: boolean
  readonly isLocked: boolean
  readonly onRemoveWorktree?: (path: string) => void
}

export function generateWorktreeContextMenuItems(
  config: IWorktreeContextMenuConfig
): ReadonlyArray<IMenuItem> {
  const { path, isMainWorktree, isLocked, onRemoveWorktree } = config
  const name = Path.basename(path)
  const items = new Array<IMenuItem>()

  items.push({
    label: __DARWIN__ ? 'Copy Worktree Name' : 'Copy worktree name',
    action: () => clipboard.writeText(name),
  })

  items.push({
    label: __DARWIN__ ? 'Copy Worktree Path' : 'Copy worktree path',
    action: () => clipboard.writeText(path),
  })

  items.push({ type: 'separator' })

  if (onRemoveWorktree !== undefined) {
    items.push({
      label: 'Delete…',
      action: () => onRemoveWorktree(path),
      enabled: !isMainWorktree && !isLocked,
    })
  }

  return items
}
