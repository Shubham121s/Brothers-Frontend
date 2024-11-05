import superAdminNavigationConfig from './superAdmin.navigation.config'
import instrumentNavigationConfig from './Instrument.navigation.config'
import store from '../../store'

const state = store.getState()
const { navigationConfigs } = state.auth.user

const navigationConfig = [
  // ...(navigationConfigs || [])
  ...superAdminNavigationConfig,
  ...instrumentNavigationConfig
]

export default navigationConfig
