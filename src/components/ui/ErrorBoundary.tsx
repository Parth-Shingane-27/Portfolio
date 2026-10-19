import { Component, type ReactNode } from 'react'

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div role="alert" className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Something went wrong.</h1>
        <p className="mt-4 text-muted">Please reload the page. If it keeps happening, email parthshingane27@gmail.com.</p>
      </div>
    )
  }
}
