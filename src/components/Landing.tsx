import { ErrorBoundary } from "commonComponents/ErrorBoundary";
import { Page } from "components/Page";

export const Landing = () => {
  return (
    <ErrorBoundary>
      <Page />
    </ErrorBoundary>
  );
};
