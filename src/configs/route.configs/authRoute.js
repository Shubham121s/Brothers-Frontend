import React from 'react'

const authRoute = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: React.lazy(() => import('../../view/auth/signIn')),
        authority: [],
    },
]

export default authRoute
