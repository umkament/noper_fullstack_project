import type { Meta, StoryObj } from '@storybook/react'

import { avatar } from '@/assets'
import { AvatarWithName } from '@/components/ui/avatar/avatarWithName.tsx'
import { BsPersonCircle } from 'react-icons/bs'
import { IoMdLogOut } from 'react-icons/io'

import { Avatar } from '../avatar'
import { DropDownItem, DropDownMenu } from './dropDownMenu'

const meta = {
  argTypes: {},
  component: DropDownMenu,
  tags: ['autodocs'],
  title: 'Components/DropDownMenu',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

// @ts-ignore
export const DropDown: Story = {
  args: {
    children: (
      <>
        <DropDownItem>
          <Avatar avatar={avatar} />
          <div>
            <div>Umkament</div>
            <div>umkament@gmail.com</div>
          </div>
        </DropDownItem>
        <DropDownItem>
          <BsPersonCircle />
          <div>My page</div>
        </DropDownItem>
        <DropDownItem>
          <IoMdLogOut />
          <div>logOut</div>
        </DropDownItem>
      </>
    ),
    trigger: <AvatarWithName avatar={avatar} name={'Umkament'} />,
  },
  render: args => {
    return <DropDownMenu {...args} />
  },
}
