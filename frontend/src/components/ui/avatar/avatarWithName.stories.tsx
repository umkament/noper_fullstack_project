import { avatar } from '@/assets'
import { Meta, StoryObj } from '@storybook/react'

import { AvatarWithName } from './avatarWithName'

const meta = {
  argTypes: {},
  component: AvatarWithName,
  tags: ['autodocs'],
  title: 'Components/AvatarWithName',
} satisfies Meta<typeof AvatarWithName>

export default meta

type Story = StoryObj<typeof meta>

export const AvatarStory: Story = {
  args: {
    avatar: avatar,
    name: 'Peter Parker',
  },
}
