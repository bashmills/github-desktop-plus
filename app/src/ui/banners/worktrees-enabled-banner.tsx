import * as React from 'react'
import { Dispatcher } from '../dispatcher'
import { PopupType } from '../../models/popup'
import { PreferencesTab } from '../../models/preferences'
import { LinkButton } from '../lib/link-button'
import { SuccessBanner } from './success-banner'

interface IWorktreesEnabledBannerProps {
  readonly dispatcher: Dispatcher
  readonly onDismissed: () => void
}

export class WorktreesEnabledBanner extends React.Component<IWorktreesEnabledBannerProps> {
  private onOpenAppearanceSettings = () => {
    this.props.dispatcher.showPopup({
      type: PopupType.Preferences,
      initialSelectedTab: PreferencesTab.Appearance,
    })
  }

  public render() {
    const label = __DARWIN__ ? 'Appearance Settings' : 'Appearance Options'

    return (
      <SuccessBanner
        timeout={8000}
        onDismissed={this.props.onDismissed}
      >
        Worktrees enabled. You can change this in{' '}
        <LinkButton onClick={this.onOpenAppearanceSettings}>
          {label}
        </LinkButton>
        .
      </SuccessBanner>
    )
  }
}
