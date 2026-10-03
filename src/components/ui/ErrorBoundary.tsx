import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Shown in the console next to the error. */
  name?: string
}

type State = {
  failed: boolean
}

/**
 * Contains a render-time crash to one section instead of letting it blank the
 * page. Renders nothing once something below has thrown — a missing band is
 * better than an all-white document — and logs so the cause is still findable.
 *
 * Use it around an optional section only; it cannot recover, and it will not
 * catch errors thrown in event handlers.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[ErrorBoundary:${this.props.name ?? 'section'}]`, error, info.componentStack)
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}