import { Component, ReactNode, ErrorInfo } from "react";

interface Props {
  children?: ReactNode;
}
interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error.message, errorInfo.componentStack);
  }
  public render(): ReactNode {
    return (
      <>
        {this.state.hasError ? (
          <h1>500!! Internal Server Error</h1>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}

export default ErrorBoundary;
