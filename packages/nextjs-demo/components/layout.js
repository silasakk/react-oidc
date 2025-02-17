import { OidcProvider } from '@axa-fr/react-oidc';
import { useRouter } from 'next/router'

const configuration = {
  client_id: 'interactive.public.short',
  redirect_uri: 'http://localhost:3001/#authentication/callback',
  silent_redirect_uri: 'http://localhost:3001/#authentication/silent-callback', // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
  scope: 'openid profile email api offline_access',
  authority: 'https://demo.duendesoftware.com'
};

const onEvent=(configurationName, eventName, data )=>{
    console.log(`oidc:${configurationName}:${eventName}`, data);
  }

export default function Layout({ children }) {
    const router = useRouter()
    const withCustomHistory= () => {
        return {
            replaceState: (url) => {
                router.replace({
                    pathname: url,
                }).then(() => {
                        window.dispatchEvent(new Event('popstate'));
                    }
                )
            }
        };
    };
  return (
    <>
    <OidcProvider configuration={configuration} onEvent={onEvent} withCustomHistory={withCustomHistory} >
      <main>{children}</main>
      </OidcProvider>
    </>
  )
}