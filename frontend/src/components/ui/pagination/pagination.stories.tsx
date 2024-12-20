import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Pagination } from './pagination'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationStory: Story = {
  args: {
    className: undefined,
    count: 100,
    onChange: () => {},
    onPerPageChange: () => {},
    page: 5,
    perPage: 10,
    perPageOptions: [10, 20, 30],
  },
}

export const Default = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(8)
  const TOTAL_PAGES_COUNT = 100

  const pageChangeHandle = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div>
      <Pagination
        count={TOTAL_PAGES_COUNT}
        onChange={pageChangeHandle}
        onPerPageChange={setPerPage}
        page={page}
        perPage={perPage}
        perPageOptions={[5, 8, 12, 100]}
      />
      <div>Current page: {page}</div>
      <div>Per page: {perPage}</div>
    </div>
  )
}
