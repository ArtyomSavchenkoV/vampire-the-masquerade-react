import { ErrorBoundary } from "../ErrorBoundary";
import { FC } from "react";

export const withErrorBoundary =
  <T extends object>(Component: FC<T>) =>
  ({ ...props }: T) => {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
