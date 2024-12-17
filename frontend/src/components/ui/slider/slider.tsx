import { Typography } from '@/components/ui/typography'
import * as SliderRadixUI from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderProps = {
  label?: string
  max?: number
  min?: number
  onChange?: (value: number[]) => void
  step?: number
  value: number[]
}
export const Slider = ({ label, max, min, onChange, step = 1, value }: SliderProps) => {
  return (
    <div className={s.container}>
      <Typography as={'label'} className={s.sliderLabel} variant={'body1'}>
        {label}
      </Typography>
      <div className={s.sliderWrapper}>
        <div className={s.minMax}>
          <Typography as={'h4'} className={s.value} variant={'body2'}>
            {value[0]}
          </Typography>
        </div>
        <SliderRadixUI.Root
          className={s.root}
          max={max}
          min={min}
          onValueChange={onChange}
          step={step}
          value={value}
        >
          <SliderRadixUI.Track className={s.track}>
            <SliderRadixUI.Range className={s.range} />
          </SliderRadixUI.Track>

          <SliderRadixUI.Thumb aria-label={'volume'} className={s.thumb} />
          <SliderRadixUI.Thumb aria-label={'volume'} className={s.thumb} />
        </SliderRadixUI.Root>
        <div className={s.minMax}>
          <Typography as={'h4'} className={s.value} variant={'body2'}>
            {value[1]}
          </Typography>
        </div>
      </div>
    </div>
  )
}
