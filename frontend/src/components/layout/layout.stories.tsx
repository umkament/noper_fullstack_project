import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import logo from '@/assets/URLogo.png'
import { Button } from '@/components/ui/button'

import { Layout } from './'

const meta = {
  argTypes: {},
  component: Layout,
  tags: ['autodocs'],
  title: 'Components/Layout',
} as Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const LayoutStory: Story = {
  args: {
    children: (
      <>
        <img alt={'logo'} src={logo} />
        <Button variant={'primary'}>Sign In</Button>
      </>
    ),
    isSignedIn: false,
  },
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}
