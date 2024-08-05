import React from 'react'
import View from '../view'
import SideNav from '../components/template/SideNav'
import UserDropdown from '../components/shared/UserDropdown'
import Header from '../components/template/Header'
import MobileNav from '../components/template/MobileNav'
import SideNavToggle from '../components/template/SideNavToggle'


const HeaderActionsStart = () => {
    return (
        <>
            <MobileNav />
            <SideNavToggle />
        </>
    )
}

const HeaderActionsEnd = () => {
    return (
        <>
            <UserDropdown hoverable={false} />
        </>
    )
}

const Main = (props) => {
    return (
        <div className="app-layout-modern flex flex-auto flex-col">
            <div className="flex flex-auto min-w-0">
                <SideNav />
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
                    <Header
                        className="border-b border-gray-200 dark:border-gray-700"
                        headerEnd={<HeaderActionsEnd />}
                        headerStart={<HeaderActionsStart />}
                    />
                    <View {...props} />
                </div>
            </div>
        </div>
    )
}

export default Main