import { clsx, type ClassValue } from "clsx"
import day from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

const dataFromInput = <T>(form: HTMLFormElement): T => {
  const numberFields: NodeListOf<HTMLInputElement> =
    form.querySelectorAll("input[type=number]")

  return {
    ...Object.fromEntries(new FormData(form)),
    ...Object.fromEntries(
      Array.from(numberFields).map((field) => [field.name, field.valueAsNumber])
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

const isAppError = (data: unknown): data is AppError =>
  typeof data === "object" &&
  data !== null &&
  "message" in data &&
  "details" in data

const fromDate = (date: string) => {
  day.extend(relativeTime)
  return day(date).fromNow()
}

const cn = (...inputs: ClassValue[]) => clsx(inputs)

export { cn, dataFromInput, fromDate, handleValidation, isAppError }
