import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextArea, TextareaProps } from '../textarea'

type Props<T extends FieldValues> = Omit<TextareaProps, 'id' | 'onChangeValue' | 'value'> &
  UseControllerProps<T>

export const ControlledTextarea = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...textareaProps
}: Props<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return <TextArea {...textareaProps} id={name} onChangeValue={onChange} value={value} />
}
