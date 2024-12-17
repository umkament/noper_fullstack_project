//range - функция для создания массива чисел в определенном числовом диапазоне (массив страниц пагинации)
import { useCallback, useMemo } from 'react'

const range = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length }, (_, index) => index + start)
}
//многоточие для пагинации
const DOTS = '...'

type UsePaginationProps = {
  count: number //общее количество страниц для пагинации
  onChange: (pageNumber: number) => void
  page: number //текущая активная страница
  siblings?: number //сколько страниц отображать вокруг текущей страницы в пагинации
}
type PaginationRangeType = ('...' | number)[]
export const usePagination = ({
  count = 1,
  onChange,
  page = 1,
  siblings = 1,
}: UsePaginationProps) => {
  //paginationRange - функция формирования массива страниц для отображения в пагинации
  const paginationRange = useMemo(() => {
    //totalPageNumbers - количество отображаемых позиций страниц для пагинации:
    //siblings + текущая страница + первая и последняя стр. + DOTS*2
    const totalPageNumbers = siblings + 5

    // 1
    if (totalPageNumbers >= count) {
      return range(1, count)
    }
    const firstPageValue = 1
    const lastPageValue = count

    //получаем крайнее левое и правое значение от текущей страницы согласно установленного значения siblings
    //чтобы в дальнейшем вычислить диапазон
    const leftSiblingValue = Math.max(page - siblings, 1) //выбирает максимальное из двух аргументов
    const rightSiblingValue = Math.min(page + siblings, count) //выбирает минимальное из двух

    //когда необходимо отображать левое и правое многоточие
    const showLeftDots = leftSiblingValue > 2
    const showRightDots = rightSiblingValue < count - 2

    //2
    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblings
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, count]
    }

    //3
    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblings
      const rightRange = range(count - rightItemCount + 1, count)

      return [firstPageValue, DOTS, ...rightRange]
    }

    //4
    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingValue, rightSiblingValue)

      return [firstPageValue, DOTS, ...middleRange, DOTS, lastPageValue]
    }
  }, [siblings, page, count]) as PaginationRangeType

  //nullish coalescing (??) - логический оператор, который возвращает правый операнд,
  //если левый операнд равен null или undefined, в противном случае, он возвращает левый операнд
  const lastPage = paginationRange?.[paginationRange.length - 1] ?? 1
  const isFirstPage = page === 1
  const isLastPage = page === lastPage

  //обработчик кнопки перехода на следующую страницу
  const handleNextPageClicked = useCallback(() => {
    onChange(page + 1)
  }, [page, onChange])

  //обработчик кнопки перехода на предыдущую страницу
  const handlePreviousPageClicked = useCallback(() => {
    onChange(page - 1)
  }, [page, onChange])

  // обработчик выбора страницы
  function handleMainPageClicked(pageNumber: number) {
    return () => onChange(pageNumber)
  }

  return {
    handleMainPageClicked,
    handleNextPageClicked,
    handlePreviousPageClicked,
    isFirstPage,
    isLastPage,
    paginationRange: paginationRange || [],
  }
}
