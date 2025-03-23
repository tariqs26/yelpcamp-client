import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 3600 * 24,
    },
  },
})

export const ReactQueryProvider = ({
  children,
}: Readonly<React.PropsWithChildren>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
