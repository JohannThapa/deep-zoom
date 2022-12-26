

import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, displayError: "" };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log("error", error);
        console.log("errorInfo", errorInfo);
    }
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h1>Something went wrong.</h1>;
                    <code>
                        {this.state.error.message}
                    </code>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;