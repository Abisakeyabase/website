import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error in component:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong in this section.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
