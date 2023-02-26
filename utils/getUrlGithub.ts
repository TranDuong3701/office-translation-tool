import { useRuntimeConfig } from '#app'

export function getGitHubUrl() {
  const rootURl = 'https://github.com/login/oauth/authorize'
  const { githubOauthClientId, githubOauthRedirect } = useRuntimeConfig()

  const options = {
    client_id: githubOauthClientId,
    redirect_uri: githubOauthRedirect,
  }

  const qs = new URLSearchParams(options)

  return `${rootURl}?${qs.toString()}`
}
