import { Component } from 'react'

/**
 * ErrorBoundary para componentes Three.js (Avatar3D, Projects con carrusel 3D).
 * Si el canvas WebGL falla (driver incompatible, móvil sin soporte, etc.)
 * muestra un fallback limpio en lugar de pantallazo blanco.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // En producción podrías enviar a Sentry aquí
    console.warn('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          border: '0.5px dashed var(--border)',
          borderRadius: 'var(--radius)',
          margin: '1rem 0',
        }}>
          <span style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.5rem' }}>
            {'// render error'}
          </span>
          Este componente no pudo cargarse en este dispositivo.
        </div>
      )
    }
    return this.props.children
  }
}
