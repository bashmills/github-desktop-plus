import { Account } from '../models/account'

/** Get the auth key for the user. */
export function getKeyForAccount(account: Account): string {
  return getKeyForEndpoint(account.endpoint, account.login)
}

/** Get the auth key for the endpoint. */
export function getKeyForEndpoint(endpoint: string, login: string): string {
  const appName = __DEV__ ? 'GitHub Desktop Plus Dev' : 'GitHub Desktop Plus'

  return `${appName} - ${endpoint} - ${login}`
}
