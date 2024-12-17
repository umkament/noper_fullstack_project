import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider } from './'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderStory: Story = {
  args: {
    label: 'example of slider (пример слайдера)',
    max: 10,
    min: 0,
    onChange: () => {},
    value: [2, 6],
  },
  render: args => {
    const [sliderValue, setSliderValue] = useState<number[]>(args.value)

    const onChangeHandler = (value: number[]) => {
      setSliderValue(value)
    }

    return <Slider {...args} onChange={onChangeHandler} value={sliderValue} />
  },
}
