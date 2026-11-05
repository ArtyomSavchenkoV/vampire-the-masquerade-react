import { PageErrorBoundary } from "components/Page/PageErrorBoundary";
import { Page } from "components/Page";

export const Landing = () => {
  return (
    <PageErrorBoundary>
      <Page />
    </PageErrorBoundary>
  );
};
