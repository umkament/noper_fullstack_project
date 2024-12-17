import { avatar } from '@/assets'
import { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './avatar'

const meta = {
  argTypes: {},
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const AvatarStory: Story = {
  args: {
    avatar: avatar,
  },
}
