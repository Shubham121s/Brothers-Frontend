import React from 'react'
import { useSelector } from 'react-redux'
import Logo from './Logo'

const HeaderLogo = () => {
    const mode = useSelector((state) => state.theme.mode)

    return <Logo mode={mode} className="hidden md:block" />
}

export default HeaderLogo
