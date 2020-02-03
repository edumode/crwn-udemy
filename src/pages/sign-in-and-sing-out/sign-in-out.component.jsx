import React from 'react'

import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'

import './sign-in-out.styles.scss'

const SignInAndSignUpPage = () => (
    <div className='sign-in-out'>
        <SignIn />
        <SignUp />
    </div>
)

export default SignInAndSignUpPage;