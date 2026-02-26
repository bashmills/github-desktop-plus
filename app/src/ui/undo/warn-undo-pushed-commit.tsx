import * as React from 'react'
import { Dialog, DialogContent, DialogFooter } from '../dialog'
import { Repository } from '../../models/repository'
import { Dispatcher } from '../dispatcher'
import { OkCancelButtonGroup } from '../dialog/ok-cancel-button-group'
import { Commit } from '../../models/commit'

interface IWarnUndoPushedCommitProps {
  readonly dispatcher: Dispatcher
  readonly repository: Repository
  readonly commit: Commit
  readonly onDismissed: () => void
}

interface IWarnUndoPushedCommitState {
  readonly isLoading: boolean
}

/**
 * Dialog that warns user that they are about to undo a commit that has already
 * been pushed to the remote repository.
 */
export class WarnUndoPushedCommit extends React.Component<
  IWarnUndoPushedCommitProps,
  IWarnUndoPushedCommitState
> {
  public constructor(props: IWarnUndoPushedCommitProps) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  public render() {
    const title = __DARWIN__ ? 'Undo Pushed Commit?' : 'Undo pushed commit?'

    return (
      <Dialog
        id="warn-undo-pushed-commit"
        type="warning"
        title={title}
        loading={this.state.isLoading}
        disabled={this.state.isLoading}
        onSubmit={this.onSubmit}
        onDismissed={this.props.onDismissed}
        role="alertdialog"
        ariaDescribedBy="undo-pushed-commit-warning-message"
      >
        <DialogContent>
          <p id="undo-pushed-commit-warning-message">
            This commit has already been pushed to the remote repository.
            Undoing it will rewrite your local history.
          </p>
          <p>
            If others have pulled this commit, they may encounter issues when
            pushing or pulling. You will need to force push to update the remote
            repository.
          </p>
          <p>Are you sure you want to continue?</p>
        </DialogContent>
        <DialogFooter>
          <OkCancelButtonGroup destructive={true} okButtonText="Undo Commit" />
        </DialogFooter>
      </Dialog>
    )
  }

  private onSubmit = async () => {
    const { dispatcher, repository, commit, onDismissed } = this.props
    this.setState({ isLoading: true })

    try {
      await dispatcher.undoCommit(repository, commit, false)
    } finally {
      this.setState({ isLoading: false })
    }

    onDismissed()
  }
}
