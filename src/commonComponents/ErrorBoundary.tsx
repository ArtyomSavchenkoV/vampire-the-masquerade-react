import { ReactNode, useState } from "react";
import React from "react";
import { ErrorIndicator } from "./ErrorIndicator";

interface ErrorBoundaryProps {
  children: ReactNode;
}

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return (
      <ErrorIndicator>
        <p>Произошла критическая ошибка: {error.message}</p>
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
