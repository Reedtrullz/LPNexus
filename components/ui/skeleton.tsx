export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white/10 rounded animate-pulse ${className}`} />
  );
}

export function PositionCardSkeleton() {
  return (
    <div className="glass-surface rounded-3xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <div className="w-9 h-9 bg-white/10 rounded-full" />
            <div className="w-9 h-9 bg-white/10 rounded-full" />
          </div>
          <div>
            <div className="h-5 w-32 bg-white/10 rounded mb-2" />
            <div className="h-3 w-20 bg-white/10 rounded" />
          </div>
        </div>
        <div className="text-right">
          <div className="h-5 w-12 bg-white/10 rounded mb-1" />
          <div className="h-3 w-16 bg-white/10 rounded" />
        </div>
      </div>

      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div className="h-full w-1/2 bg-white/10 rounded-full" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="h-3 w-8 bg-white/10 rounded mx-auto mb-1" />
          <div className="h-4 w-10 bg-white/10 rounded mx-auto" />
        </div>
        <div className="text-center">
          <div className="h-3 w-8 bg-white/10 rounded mx-auto mb-1" />
          <div className="h-4 w-10 bg-white/10 rounded mx-auto" />
        </div>
        <div className="text-center">
          <div className="h-3 w-8 bg-white/10 rounded mx-auto mb-1" />
          <div className="h-4 w-10 bg-white/10 rounded mx-auto" />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <div className="flex-1 h-12 bg-white/10 rounded-2xl" />
        <div className="flex-1 h-12 bg-white/10 rounded-2xl" />
      </div>
    </div>
  );
}

export function KPICardSkeleton() {
  return (
    <div className="glass-surface rounded-3xl p-6 animate-pulse">
      <div className="h-4 w-20 bg-white/10 rounded mb-2" />
      <div className="h-8 w-24 bg-white/10 rounded" />
    </div>
  );
}

export function FeatureCardSkeleton() {
  return (
    <div className="glass-elevated rounded-3xl p-6 animate-pulse">
      <div className="w-12 h-12 bg-white/10 rounded-2xl mb-6" />
      <div className="h-6 w-40 bg-white/10 rounded mb-3" />
      <div className="h-4 w-full bg-white/10 rounded mb-2" />
      <div className="h-4 w-3/4 bg-white/10 rounded" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => <KPICardSkeleton key={i} />)}
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => <FeatureCardSkeleton key={i} />)}
      </div>
      
      <div>
        <div className="h-6 w-32 bg-white/10 rounded mb-4" />
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => <PositionCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}

export function LoadingDots() {
  return (
    <div className="flex items-center gap-1">
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

export function SkeletonLine({ width = "100%", height = "1rem" }: { width?: string; height?: string }) {
  return (
    <div 
      className="bg-white/10 rounded animate-pulse" 
      style={{ width, height }} 
    />
  );
}

export function SkeletonCircle({ size = "3rem" }: { size?: string }) {
  return (
    <div 
      className="bg-white/10 rounded-full animate-pulse" 
      style={{ width: size, height: size }} 
    />
  );
}
