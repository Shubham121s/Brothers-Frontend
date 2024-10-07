import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_COLLAPSE
} from '../../constants/navigation.constant'
import { SUPER_ADMIN, ADMIN, SUB_ADMIN } from '../../constants/roles.constant'

const instrumentNavigationConfig = [
  {
    key: 'instruments',
    path: '',
    title: 'INSTRUMENTS',
    translateKey: 'nav.instruments.instruments',
    icon: 'instrument',
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
    subMenu: [
      {
        key: 'dashboard',
        path: `/instrument/dashboard`,
        title: 'Dashboard',
        translateKey: 'nav.dashboard',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
        subMenu: []
      },
      {
        key: 'instrument',
        path: `/instrument/list`,
        title: 'Instrument',
        translateKey: 'nav.instrument',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
        subMenu: []
      },
      {
        key: 'calibration',
        path: `/instrument/calibration`,
        title: 'Calibration',
        translateKey: 'nav.calibration',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
        subMenu: []
      }
    ]
  }
]

export default instrumentNavigationConfig
