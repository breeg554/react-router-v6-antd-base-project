import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import AuthProvider from "./auth";
import { ConfigProvider } from "antd";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/react-query";
import plPL from "antd/lib/locale/pl_PL";
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

type AppProviderProps = {
  children: React.ReactNode;
};

const ErrorFallback = ({ ...props }: any) => {
  const is404 =
    props.error && props.error.response && props.error.response.status === 404;

  return (
    <div>
      <h2>{is404 ? "Nie ma takiej strony" : "Ooops, something went wrong :("} </h2>
      {is404 ? (
        <a href="/"> Wróć na stronę główną!</a>
      ) : (
        <button onClick={() => window.location.assign(window.location.origin)}>
          Refresh
        </button>
      )}
    </div>
  );
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <p>Spiner....</p>
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={(props) => <ErrorFallback {...props} />}>
        <QueryClientProvider client={queryClient}>
          {/* <Notifications /> */}
          <ConfigProvider locale={plPL}>
            <AuthProvider>
              <Router>{children}</Router>
            </AuthProvider>
          </ConfigProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
