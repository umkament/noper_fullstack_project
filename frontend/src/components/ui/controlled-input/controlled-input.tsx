import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input, InputProps } from '../input'

type Props<T extends FieldValues> = Omit<InputProps, 'id' | 'onChangeValue' | 'value'> &
  UseControllerProps<T>

export const ControlledInput = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...InputProps
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

  return <Input {...InputProps} id={name} onChangeValue={onChange} value={value} />
}
