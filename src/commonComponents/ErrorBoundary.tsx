import { ReactNode, useState } from "react";
import React from "react";
import { ErrorIndicator } from "./ErrorIndicator";
import { useActions } from "store/selectors";
import { Button } from "baseComponents/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [error, setError] = useState<Error | null>(null);
  const actions = useActions();

  if (error) {
    return (
      <ErrorIndicator>
        <p>Произошла критическая ошибка: {error.message}</p>
        <p>Попробуйте сбросить состояние системы.</p>
        <Button
          onClick={() => {
            if (actions?.resetStore) {
              actions.resetStore();
            } else {
              console.error("Actions not available to reset store");
            }
          }}
        >
          Сбросить хранилище (resetStore)
        </Button>
      </ErrorIndicator>
    );
  }

  return <InnerBoundary onCatch={setError}>{children}</InnerBoundary>;
};

class InnerBoundary extends React.Component<
  { onCatch: (err: Error, info: React.ErrorInfo) => void; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    // Явная инициализация решает проблему "Cannot read properties of null"
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err: Error, info: React.ErrorInfo) {
    this.props.onCatch(err, info);
  }

  render() {
    if (this.state.hasError) {
      return null; // Передаём управление родителю
    }
    return this.props.children;
  }
}
