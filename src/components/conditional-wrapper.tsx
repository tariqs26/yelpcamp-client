type ConditionalWrapperProps = Readonly<{
  condition: boolean
  wrapper: (children: React.ReactNode) => React.ReactElement
  children: React.ReactNode
}>

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) => (condition ? wrapper(children) : children)
