import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './'

const meta = {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputStory: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input',
    type: 'text',
  },
}

export const InputStoryDisabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Input',
    placeholder: 'try to type text',
    type: 'text',
  },
}
export const InputStoryWithError: Story = {
  args: {
    className: 'isError',
    errorMessage: 'an error has occurred',
    label: 'Error Input',
    placeholder: 'something went wrong',
    type: 'text',
  },
}
export const InputStoryWithSearchIcon: Story = {
  args: {
    label: 'Search Input',
    placeholder: 'start to search something',
    type: 'search',
  },
}
