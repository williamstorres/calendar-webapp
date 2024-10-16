"use client";
import "dotenv/config";
import { Suspense, use } from "react";
const mockingEnabledPromise =
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development" &&
  process.env.ENABLE_MOCK_SERVER === "true"
    ? import("../mocks/browser").then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest: "bypass",
        });
      })
    : Promise.resolve();

export function MSWProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  use(mockingEnabledPromise);
  return children;
}
