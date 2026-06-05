import { Suspense } from "react";
import RoadmapView from "./components/RoadmapView";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background text-foreground-muted text-sm">
          Loading roadmap…
        </div>
      }
    >
      <RoadmapView />
    </Suspense>
  );
}
