import React, { Suspense } from 'react'
import Auth from '../../../layout/authLayout/auth';
import { Loading } from '../../../components/shared';

const SignInForm = React.lazy(() => import('./SignInForm'))


const Login = () => {
    return (
        <Auth>
            <Suspense fallback={<Loading loading={true} />}>
                <SignInForm />
            </Suspense>
        </Auth>
    )
}

export default Login