import s from './pagination.module.scss'

import { MainPaginationButtons, NextButton, PerPageSelect, PrevButton } from './paginationButtons'
import { usePagination } from './usePagination'

export const Pagination = ({
  className,
  count = 10,
  onChange,
  onPerPageChange,
  page = 1,
  perPage = 1,
  perPageOptions,
  siblings,
}: PaginationProps) => {
  const {
    handleMainPageClicked,
    handleNextPageClicked,
    handlePreviousPageClicked,
    isFirstPage,
    isLastPage,
    paginationRange,
  } = usePagination({ count, onChange, page, siblings })

  //showPerPageSelect определяет, нужно ли отображать выпадающий список или нет
  const showPerPageSelect = perPage && perPageOptions && onPerPageChange

  return (
    <div className={`${s.root} ${className}`}>
      <div className={s.container}>
        <PrevButton disable={isFirstPage} onClick={handlePreviousPageClicked} />
        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />
        <NextButton disable={isLastPage} onClick={handleNextPageClicked} />
      </div>
      {showPerPageSelect && <PerPageSelect {...{ onPerPageChange, perPage, perPageOptions }} />}
    </div>
  )
}

type PaginationConditionals =
  | {
      onPerPageChange: (itemPerPage: number) => void
      perPage: number
      perPageOptions: number[]
    }
  | {
      onPerPageChange?: never
      perPage?: null
      perPageOptions?: never
    }

export type PaginationProps = {
  className?: string
  count: number
  onChange: (page: number) => void
  onPerPageChange: (itemPerPage: number) => void //функция обратного вызова при изменении количества элементов на странице
  page: number
  perPage?: null | number // текущее количество элементов на странице
  perPageOptions?: number[] //варианты количества элементов на странице
  siblings?: number
} & PaginationConditionals
