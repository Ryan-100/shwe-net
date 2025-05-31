"use client";
import React, { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/locale/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: 1000,
        staleTime: 60 * 1000,
      },
    },
  }))
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </I18nextProvider>
      </QueryClientProvider>
      <Toaster
        gutter={24}
        toastOptions={{
          style: {
            padding: "16px",
            borderRadius: "8px",
          },
        }}
        containerStyle={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        containerClassName="!p-0"
      />
    </>
  );
};

export default Provider;
