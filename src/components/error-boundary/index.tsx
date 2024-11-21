import React from 'react';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    
    return { hasError: true };
  }

  componentDidCatch(_error: any, _errorInfo: any) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ position:'fixed', textAlign: 'center', width: '100%', top: '40%' }}>
          <h2>Ocurri&oacute; un error al mostrar la aplicaci&oacute;n</h2>
          <p>Por favor recarga la p&aacute;gina o contacta a soporte si el problema persiste</p>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;