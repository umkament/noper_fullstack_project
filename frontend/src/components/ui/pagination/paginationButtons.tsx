import { Select } from '@/components/ui/select'
import { PiArrowFatLineLeftThin, PiArrowFatLineRightThin } from 'react-icons/pi'

import s from './pagination.module.scss'

export const Dots = () => {
  return <span className={s.dots}>{'...'}</span>
}

export const PageButton = ({ disable, onClick, page, selected }: PageButtonProps) => {
  //вводим переменную для выделения текущей страницы
  const activePage = selected ? s.selected : ''

  return (
    <button className={`${activePage} ${s.item}`} disabled={disable || selected} onClick={onClick}>
      {page}
    </button>
  )
}
export const PrevButton = ({ disable, onClick }: NavigationButtonsProps) => {
  return (
    <button className={s.item} disabled={disable} onClick={onClick}>
      <PiArrowFatLineLeftThin className={s.icon} />
    </button>
  )
}
export const NextButton = ({ disable, onClick }: NavigationButtonsProps) => {
  return (
    <button className={s.item} disabled={disable} onClick={onClick}>
      <PiArrowFatLineRightThin className={s.icon} />
    </button>
  )
}
export const MainPaginationButtons = ({
  currentPage,
  onClick,
  paginationRange,
}: MainPaginationButtonsProps) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage

        if (typeof page !== 'number') {
          return <Dots key={index} />
        }

        return (
          <PageButton key={index} onClick={() => onClick(page)} page={page} selected={isSelected} />
        )
      })}
    </>
  )
}

export const PerPageSelect = ({ onPerPageChange, perPage, perPageOptions }: PerPageSelectProps) => {
  const selectOptions = perPageOptions.map(value => ({
    label: value.toString(),
    value: value.toString(),
  }))
  const selectPerPage = perPage.toString()
  const onPerPageChangeHandler = (itemPerPage: string) => {
    onPerPageChange(+itemPerPage)
  }

  return (
    <div className={s.selectBox}>
      show
      <Select
        className={s.select}
        onValueChange={onPerPageChangeHandler}
        selectOptions={selectOptions}
        value={selectPerPage}
      />
      on page
    </div>
  )
}

type NavigationButtonsProps = {
  disable?: boolean
  onClick: () => void
}
type PageButtonProps = NavigationButtonsProps & {
  page: number
  selected: boolean
}

type MainPaginationButtonsProps = {
  currentPage: number //номер текущей страницы
  onClick: (pageNumber: number) => void //передает номер страницы при клике на кнопку
  paginationRange: (number | string)[] //массив, состоящий из диапазона страниц (числа и/или многоточия)
}
export type PerPageSelectProps = {
  onPerPageChange: (itemPerPage: number) => void //вызывается при изменении количества элементов на странице
  perPage: number // количество элементов на странице
  perPageOptions: number[] // массив с вариантами количества элементов на странице
}
