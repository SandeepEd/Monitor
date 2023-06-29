import { Component } from 'react';

export class ErrorBoundary extends Component<{ children: JSX.Element }, {
  hasError: boolean; error: Error | null;
}> {
  constructor(props: { children: JSX.Element }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    const { error, hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="flex flex-col justify-center items-center h-screen bg-red-50">
          <h1 className="text-3xl font-bold text-red-600">Something went wrong</h1>
          <p className="mt-4 text-lg text-red-500">{error?.message}</p>
        </div>
      );
    }
    return children;
  }
}
