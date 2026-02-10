import * as React from 'react'
import { Dispatcher } from '../dispatcher'
import * as octicons from '../octicons/octicons.generated'
import { Repository } from '../../models/repository'
import { ToolbarDropdown, DropdownState } from './dropdown'
import { FoldoutType } from '../../lib/app-state'
import { WorktreeEntry } from '../../models/worktree'
import { WorktreeList } from '../worktrees/worktree-list'
import { listWorktrees, isLinkedWorktree } from '../../lib/git/worktree'
import { CloningRepository } from '../../models/cloning-repository'

interface IWorktreeDropdownProps {
  readonly dispatcher: Dispatcher
  readonly repository: Repository
  readonly isOpen: boolean
  readonly onDropDownStateChanged: (state: DropdownState) => void
  readonly enableFocusTrap: boolean
  readonly repositories: ReadonlyArray<Repository | CloningRepository>
}

interface IWorktreeDropdownState {
  readonly worktrees: ReadonlyArray<WorktreeEntry>
  readonly filterText: string
  readonly isCurrentRepoLinkedWorktree: boolean
  readonly worktreeAddedRepo: Repository | null
}

export class WorktreeDropdown extends React.Component<
  IWorktreeDropdownProps,
  IWorktreeDropdownState
> {
  public constructor(props: IWorktreeDropdownProps) {
    super(props)
    this.state = {
      worktrees: [],
      filterText: '',
      isCurrentRepoLinkedWorktree: false,
      worktreeAddedRepo: null,
    }
  }

  public componentDidUpdate(prevProps: IWorktreeDropdownProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      this.fetchWorktrees()
    }
  }

  private async fetchWorktrees() {
    const { repository } = this.props

    try {
      const [worktrees, isLinked] = await Promise.all([
        listWorktrees(repository),
        isLinkedWorktree(repository),
      ])

      this.setState({
        worktrees,
        isCurrentRepoLinkedWorktree: isLinked,
      })
    } catch (e) {
      log.error('Failed to fetch worktrees', e)
      this.setState({
        worktrees: [],
        isCurrentRepoLinkedWorktree: false,
      })
    }
  }

  private onWorktreeClick = async (worktree: WorktreeEntry) => {
    const { dispatcher, repositories } = this.props
    const worktreePath = normalizePath(worktree.path)
    const previousWorktreeRepo = this.state.worktreeAddedRepo

    dispatcher.closeFoldout(FoldoutType.Worktree)

    const existingRepo = repositories.find(
      r => r instanceof Repository && normalizePath(r.path) === worktreePath
    )

    if (existingRepo && existingRepo instanceof Repository) {
      await dispatcher.selectRepository(existingRepo)
      this.setState({ worktreeAddedRepo: null })
    } else {
      const addedRepos = await dispatcher.addRepositories([worktree.path])

      if (addedRepos.length > 0) {
        await dispatcher.selectRepository(addedRepos[0])
        this.setState({ worktreeAddedRepo: addedRepos[0] })
      }
    }

    if (previousWorktreeRepo) {
      await dispatcher.removeRepository(previousWorktreeRepo, false)
      dispatcher.closeFoldout(FoldoutType.Repository)
    }
  }

  // Intentional no-op: navigation happens on click, not selection change
  private onWorktreeSelected = (_worktree: WorktreeEntry) => {}

  private onFilterTextChanged = (text: string) => {
    this.setState({ filterText: text })
  }

  private renderWorktreeFoldout = (): JSX.Element | null => {
    const { worktrees } = this.state

    return (
      <WorktreeList
        worktrees={worktrees}
        currentWorktree={this.getCurrentWorktree()}
        selectedWorktree={null}
        onWorktreeSelected={this.onWorktreeSelected}
        onWorktreeClick={this.onWorktreeClick}
        filterText={this.state.filterText}
        onFilterTextChanged={this.onFilterTextChanged}
        canCreateNewWorktree={false}
      />
    )
  }

  private getCurrentWorktree(): WorktreeEntry | null {
    const repoPath = normalizePath(this.props.repository.path)
    return (
      this.state.worktrees.find(wt => normalizePath(wt.path) === repoPath) ??
      null
    )
  }

  public render() {
    const { isOpen, enableFocusTrap } = this.props
    const currentState: DropdownState = isOpen ? 'open' : 'closed'

    return (
      <ToolbarDropdown
        className="worktree-button"
        icon={octicons.fileDirectory}
        title="Worktrees"
        description="Worktrees"
        tooltip={isOpen ? undefined : 'Worktrees'}
        onDropdownStateChanged={this.props.onDropDownStateChanged}
        dropdownContentRenderer={this.renderWorktreeFoldout}
        dropdownState={currentState}
        showDisclosureArrow={true}
        enableFocusTrap={enableFocusTrap}
      />
    )
  }
}

function normalizePath(p: string): string {
  return p.replace(/\/+$/, '')
}
