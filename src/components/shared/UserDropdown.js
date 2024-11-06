import React, { useState } from 'react'
import { Avatar, Dropdown, Notification, Toast } from '../../components/ui'
import ConfirmDialog from './ConfirmDialog'
import withHeaderItem from '../../utils/hoc/withHeaderItem'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi'
import { MdLockOpen } from 'react-icons/md'
import useAuth from '../../utils/hooks/useAuth'
import defaultProfile from './defaultProfile.jpg'
import { togglePasswordDialog } from '../../store/auth/sessionSlice'
import { apiUpdateUserPassword } from '../../services/SuperAdmin/UserService'
import PasswordInput from './PasswordInput'

const dropdownItemList = [
  {
    label: 'Change Password',
    path: '/profile/settings',
    icon: <HiOutlineUser />,
    disabled: true
  }
]

export const UserDropdown = ({ className }) => {
  const { name, email, authority } = useSelector((state) => state.auth.user)
  const { passwordDialog } = useSelector((state) => state.auth.session)

  const [password, setPassword] = useState('')

  const { signOut } = useAuth()
  const dispatch = useDispatch()

  const UserAvatar = (
    <div className={classNames(className, 'flex items-center gap-2')}>
      <Avatar
        size={32}
        shape="circle"
        src={defaultProfile}
      />
      <div className="hidden md:block">
        <div className="text-xs capitalize">{authority[0] || 'guest'}</div>
        <div className="font-bold">{name}</div>
      </div>
    </div>
  )

  const passwordChange = () => {
    dispatch(togglePasswordDialog(true))
  }

  const onDialogClose = () => {
    dispatch(togglePasswordDialog(false))
  }

  const onSavePassword = async () => {
    try {
      console.log(password)
      const resp = await apiUpdateUserPassword({ password: password })
      if (resp.status < 300) {
        Toast.push(
          <Notification
            title={'Success'}
            type={'success'}
            duration={2500}
          >
            {'Password Updated Successfully'}
          </Notification>,
          {
            placement: 'top-center'
          }
        )
        onDialogClose()
        signOut()
      } else {
        Toast.push(
          <Notification
            title={'Error'}
            type={'danger'}
            duration={2500}
          >
            {'Some Error Occured'}
          </Notification>,
          {
            placement: 'top-center'
          }
        )
      }
    } catch (error) {
      Toast.push(
        <Notification
          title={'Error'}
          type={'danger'}
          duration={2500}
        >
          {'Some Error Occured'}
        </Notification>,
        {
          placement: 'top-center'
        }
      )
    }
  }

  return (
    <div>
      <Dropdown
        menuStyle={{ minWidth: 240, right: 0 }}
        renderTitle={UserAvatar}
        placement="bottom-end"
      >
        <Dropdown.Item variant="header">
          <div className="py-2 px-3 flex items-center gap-2">
            {/* <Avatar size={32} shape="circle" src={appConfig.apiPrefix + image} /> */}
            <Avatar
              size={32}
              shape="circle"
              src={defaultProfile}
            />{' '}
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">
                {name}
              </div>
              <div className="text-xs">{email}</div>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item variant="divider" />
        {/* {dropdownItemList.map((item) => (
          <Dropdown.Item
            eventKey={item.label}
            key={item.label}
            className="mb-1"
            disabled={item.disabled}
          >
            <Link
              className="flex gap-2 items-center"
              to={item.path}
            >
              <span className="text-xl opacity-50">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </Dropdown.Item>
        ))} */}
        <Dropdown.Item
          onClick={passwordChange}
          eventKey="Change Password"
          className="gap-2"
        >
          <span className="text-xl opacity-50">
            <MdLockOpen />
          </span>
          <span>Change Password</span>
        </Dropdown.Item>
        <Dropdown.Item variant="divider" />
        <Dropdown.Item
          onClick={signOut}
          eventKey="Sign Out"
          className="gap-2"
        >
          <span className="text-xl opacity-50">
            <HiOutlineLogout />
          </span>
          <span>Sign Out</span>
        </Dropdown.Item>
      </Dropdown>
      <ConfirmDialog
        isOpen={passwordDialog}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        type="success"
        title="Change Password"
        onCancel={onDialogClose}
        onConfirm={onSavePassword}
        confirmText={'Save'}
        confirmButtonColor="purple-600"
        width={450}
      >
        <PasswordInput
          className="mt-4"
          placeholder="New Password"
          style={{ width: '300px' }}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </ConfirmDialog>
    </div>
  )
}

export default withHeaderItem(UserDropdown)
