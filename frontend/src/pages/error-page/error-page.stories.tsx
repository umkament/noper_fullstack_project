import { MemoryRouter } from 'react-router-dom'

import { errorImg } from '@/assets'
import { Meta, StoryObj } from '@storybook/react'
import { JSX } from 'react/jsx-runtime'

import { ErrorPage } from './error-page'

const meta = {
  argTypes: {},
  component: ErrorPage,
  tags: ['autodocs'],
  title: 'Pages/error-page',
} satisfies Meta<typeof ErrorPage>

export default meta
type Story = StoryObj<typeof meta>

export const ErrorPageStory: Story = (args: JSX.IntrinsicAttributes) => (
  <MemoryRouter>
    <ErrorPage {...args} />
  </MemoryRouter>
)

ErrorPageStory.args = {
  errorMessage: 'Sorry! Page not found!',
  img: errorImg,
}
