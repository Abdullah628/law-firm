
import { Skeleton } from "@/components/ui/skeleton"

export default function ClientsLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Skeleton className="h-10 w-full sm:w-96" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-8" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
