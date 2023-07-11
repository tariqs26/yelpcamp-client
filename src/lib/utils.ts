import day from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { type ClassValue, clsx } from "clsx"

const dataFromInput = <T>(form: HTMLFormElement): T => {
  const numberFields = form.querySelectorAll(
    "input[type=number]"
  ) as NodeListOf<HTMLInputElement>

  return {
    ...Object.fromEntries(new FormData(form)),
    ...Object.fromEntries(
      Array.from(numberFields).map((field) => {
        return [field.name, field.valueAsNumber]
      })
    ),
  } as T
}

const handleValidation = (e: React.FormEvent<HTMLFormElement>): boolean => {
  e.preventDefault()
  e.stopPropagation()
  if (!e.currentTarget.checkValidity()) {
    e.currentTarget.classList.add("was-validated")
    return false
  }
  return true
}

const isAppError = (data: any): data is AppError => {
  return "message" in data && "details" in data
}

const fromDate = (date: string) => {
  day.extend(relativeTime)
  return day(date).fromNow()
}

const cn = (...inputs: ClassValue[]) => clsx(inputs)

export { dataFromInput, handleValidation, isAppError, fromDate, cn }
