import { clsx, type ClassValue } from "clsx"
import day from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import type { AppError } from "~/types"

export const dataFromInput = <T>(form: HTMLFormElement): T => {
  const numberFields: NodeListOf<HTMLInputElement> =
    form.querySelectorAll("input[type=number]")

  return {
    ...Object.fromEntries(new FormData(form)),
    ...Object.fromEntries(
      Array.from(numberFields).map((field) => [field.name, field.valueAsNumber])
    ),
  } as T
}

export const handleValidation = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  e.stopPropagation()

  if (!e.currentTarget.checkValidity()) {
    e.currentTarget.classList.add("was-validated")
    return false
  }

  return true
}

export const isAppError = (data: unknown): data is AppError =>
  typeof data === "object" &&
  data !== null &&
  "message" in data &&
  "details" in data

day.extend(relativeTime)
export const fromDate = (date: string) => day(date).fromNow()

export const cn = (...inputs: ClassValue[]) => clsx(inputs)
