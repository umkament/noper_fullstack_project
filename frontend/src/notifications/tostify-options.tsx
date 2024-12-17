import { CheckboxIcon, Cross1Icon } from '@radix-ui/react-icons'

export const successOptions = {
  icon: <CheckboxIcon style={{ background: '#8c61ff' }} />,
  progressStyle: { background: '#8c61ff' },
  style: { background: '#333' },
}

export const errorOptions = {
  icon: <Cross1Icon style={{ background: '#CC1439', color: 'black' }} />,
  progressStyle: { background: '#CC1439' },
  style: { background: '#333' },
}
