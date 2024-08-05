import React from 'react'
import classNames from 'classnames'
import { HiOutlineCog } from 'react-icons/hi'
// import SidePanelContent from './SidePanelContent'
// import { setPanelExpand } from 'store/theme/themeSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer } from '../../../ui'
import withHeaderItem from '../../../../utils/hoc/withHeaderItem'

export const SidePanel = (props) => {
    const dispatch = useDispatch()

    const { className, ...rest } = props

    // const panelExpand = useSelector((state) => state.theme.panelExpand)

    // const direction = useSelector((state) => state.theme.direction)

    const openPanel = () => {
        // dispatch(setPanelExpand(true))
    }

    const closePanel = () => {
        // dispatch(setPanelExpand(false))
        const bodyClassList = document.body.classList
        if (bodyClassList.contains('drawer-lock-scroll')) {
            bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
        }
    }

    return (
        <>
            <div
                className={classNames('text-2xl', className)}
                onClick={openPanel}
                {...rest}
            >
                <HiOutlineCog />
            </div>
            <Drawer
                title="Theme Config"
                isOpen={false}
                onClose={closePanel}
                onRequestClose={closePanel}
                placement={'left'}
                width={375}
            >
                {/* <SidePanelContent callBackClose={closePanel} /> */}
            </Drawer>
        </>
    )
}

export default withHeaderItem(SidePanel)
