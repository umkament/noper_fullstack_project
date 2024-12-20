import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography/typography'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [
        'body1',
        'body2',
        'caption',
        'h1',
        'h2',
        'h3',
        'large',
        'link1',
        'link2',
        'overline',
        'subtitle1',
        'subtitle2',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: (
      <>
        Large. Umka is looking for a home and will definitely find it.
        <br />
        Умка ищет дом и обязательно найдет
      </>
    ),
    variant: 'large',
  },
}
export const H1: Story = {
  args: {
    children:
      'H1. Umka is looking for a home and will definitely find it. ' +
      'Умка ищет дом и обязательно найдет',
    variant: 'h1',
  },
}
export const H2: Story = {
  args: {
    children:
      'H2. Umka is looking for a home and will definitely find it. ' +
      'Умка ищет дом и обязательно найдет',
    variant: 'h2',
  },
}
export const H3: Story = {
  args: {
    children:
      'H3. Umka is looking for a home and will definitely find it. ' +
      'Умка ищет дом и обязательно найдет',
    variant: 'h3',
  },
}
export const Subtitle1: Story = {
  args: {
    children:
      'Subtitle1. Umka is looking for a home and will definitely find it. ' +
      'Умка ищет дом и обязательно найдет',
    variant: 'subtitle1',
  },
}
export const Subtitle2: Story = {
  args: {
    children:
      'Subtitle2. Umka is looking for a home and will definitely find it. ' +
      'Умка ищет дом и обязательно найдет',
    variant: 'subtitle2',
  },
}
export const Body1: Story = {
  args: {
    children:
      'Body1. Umka is looking for a home and will definitely find it. ' +
      'Умка ищет дом и обязательно найдет',
    variant: 'body1',
  },
}
export const Body2: Story = {
  args: {
    children:
      'Body2. Umka is looking for a home and will definitely find it. ' +
      'Умка ищет дом и обязательно найдет',
    variant: 'body2',
  },
}
export const Overline: Story = {
  args: {
    children:
      'Overline. Umka is looking for a home and will definitely find it. ' +
      'Умка ищет дом и обязательно найдет',
    variant: 'overline',
  },
}
export const Caption: Story = {
  args: {
    children:
      'Caption. Umka is looking for a home and will definitely find it. ' +
      'Умка ищет дом и обязательно найдет',
    variant: 'caption',
  },
}
export const Link1: Story = {
  args: {
    as: 'a',
    children:
      'Link1. Umka is looking for a home and will definitely find it. ' +
      'Умка ищет дом и обязательно найдет',
    variant: 'link1',
  },
}
export const Link2: Story = {
  args: {
    as: 'a',
    children:
      'Link2. Umka is looking for a home and will definitely find it. ' +
      'Умка ищет дом и обязательно найдет',
    variant: 'link2',
  },
}
