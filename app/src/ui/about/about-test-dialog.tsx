import * as React from 'react'
import { About } from './about'
import { getName, getVersion } from '../lib/app-proxy'
import { IUpdateState, UpdateStatus } from '../lib/update-store'

interface IAboutTestDialogProps {
  /**
   * Event triggered when the dialog is dismissed by the user in the
   * ways described in the Dialog component's dismissible prop.
   */
  readonly onDismissed: () => void

  readonly onShowAcknowledgements: () => void

  /** A function to call when the user wants to see Terms and Conditions. */
  readonly onShowTermsAndConditions: () => void
}

interface IAboutTestDialogState {
  readonly updateState: IUpdateState
}

export class AboutTestDialog extends React.Component<
  IAboutTestDialogProps,
  IAboutTestDialogState
> {
  private delayTimeoutId: number | null = null

  public constructor(props: IAboutTestDialogProps) {
    super(props)

    this.state = {
      updateState: {
        status: UpdateStatus.UpdateNotAvailable,
        lastSuccessfulCheck: new Date(Date.now() - 1000 * 60 * 60),
        isX64ToARM64ImmediateAutoUpdate: false,
        newReleases: [],
        prioritizeUpdate: false,
        prioritizeUpdateInfoUrl: undefined,
      },
    }
  }

  public render() {
    const version = __DEV__ ? __SHA__.substring(0, 10) : getVersion()

    return (
      <About
        key="about"
        onDismissed={this.props.onDismissed}
        applicationName={getName()}
        applicationVersion={version}
        applicationArchitecture={process.arch}
        onShowAcknowledgements={this.props.onShowAcknowledgements}
        onShowTermsAndConditions={this.props.onShowTermsAndConditions}
        updateState={this.state.updateState}
        allowDevelopment={true}
      />
    )
  }

  public componentWillUnmount(): void {
    if (this.delayTimeoutId !== null) {
      clearTimeout(this.delayTimeoutId)
    }
  }
}
