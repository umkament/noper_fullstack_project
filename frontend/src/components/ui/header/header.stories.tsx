import type { Meta, StoryObj } from '@storybook/react'

import logo from '@/assets/URLogo.png'
import { Button } from '@/components/ui/button'

import { Header } from './'

const meta = {
  argTypes: {},
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithButton: Story = {
  args: {
    children: (
      <>
        <img alt={'logo'} src={logo} />
        <Button variant={'primary'}>Sign In</Button>
      </>
    ),
    isSignedIn: false,
  },
}
