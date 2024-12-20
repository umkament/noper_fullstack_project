import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { CheckboxComponent } from './'

const meta = {
  component: CheckboxComponent,
  tags: ['autodocs'],
  title: 'Components/CheckboxComponent',
} satisfies Meta<typeof CheckboxComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Checkbox: Story = {
  args: {},
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checkedValue, setCheckedValue] = useState(false)

    return (
      <>
        <CheckboxComponent
          {...args}
          checked={checkedValue}
          onCheckedHandler={() => setCheckedValue(!checkedValue)}
        />
      </>
    )
  },
}
export const CheckboxWithLabel: Story = {
  args: {
    label: 'Hi,Umka',
  },
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checkedValue, setCheckedValue] = useState(false)

    return (
      <>
        <CheckboxComponent
          {...args}
          checked={checkedValue}
          onCheckedHandler={() => setCheckedValue(!checkedValue)}
        />
      </>
    )
  },
}

export const CheckboxDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}
