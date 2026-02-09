import './App.css'
import { useMemo, useState } from 'react'
import Login from './Login.jsx'
import Register from './Register.jsx'
import ViewProfile from './ViewProfile.jsx'

function App() {
  const [view, setView] = useState(() => {
    const token = localStorage.getItem('authToken')
    return token ? 'dashboard' : 'login'
  })
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || '')
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '')
  const [profile, setProfile] = useState({ email: '', fullName: '' })

  const apiBase = useMemo(() => {
    const value = import.meta.env.VITE_API_BASE_URL
    const base = typeof value === 'string' && value.length > 0 ? value : 'http://localhost:8080'
    return base.replace(/\/$/, '')
  }, [])

  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const setOk = (message) => setStatus({ type: 'ok', message })
  const setError = (message) => setStatus({ type: 'error', message })
  const clearStatus = () => setStatus({ type: 'idle', message: '' })

  const request = async (path, { method = 'GET', body, token } = {}) => {
    const res = await fetch(`${apiBase}${path}`, {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const raw = await res.text()
    let data = raw
    try {
      data = raw ? JSON.parse(raw) : null
    } catch {
      data = raw
    }

    if (!res.ok) {
      const message = typeof data === 'string' && data.length > 0 ? data : `Request failed (${res.status})`
      throw new Error(message)
    }

    return data
  }

  const persistAuth = (nextToken, nextUsername) => {
    setAuthToken(nextToken)
    setUsername(nextUsername)
    localStorage.setItem('authToken', nextToken)
    localStorage.setItem('username', nextUsername)
  }

  const fetchMe = async (token) => {
    const data = await request('/api/me', { method: 'GET', token })
    const email = typeof data?.email === 'string' ? data.email : ''
    const fullName = typeof data?.fullName === 'string' ? data.fullName : ''
    setProfile({ email, fullName })
  }

  const clearAuth = () => {
    setAuthToken('')
    setUsername('')
    localStorage.removeItem('authToken')
    localStorage.removeItem('username')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    clearStatus()
    setIsSubmitting(true)
    try {
      const data = await request('/api/auth/login', { method: 'POST', body: loginForm })
      const token = data?.token
      if (typeof token !== 'string' || token.length === 0) throw new Error('Login succeeded but token missing')
      persistAuth(token, loginForm.username)
      await fetchMe(token)
      setOk('Logged in')
      setView('dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    clearStatus()
    setIsSubmitting(true)
    try {
      await request('/api/auth/register', { method: 'POST', body: registerForm })
      // auto-login after successful registration
      const loginBody = { username: registerForm.username, password: registerForm.password }
      const data = await request('/api/auth/login', { method: 'POST', body: loginBody })
      const token = data?.token
      if (typeof token === 'string' && token.length > 0) {
        persistAuth(token, registerForm.username)
        await fetchMe(token)
        setOk('Registered and logged in')
        setView('dashboard')
      } else {
        setOk('Registered successfully. You can login now.')
        setLoginForm((prev) => ({ ...prev, username: registerForm.username }))
        setView('login')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Register failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = async () => {
    clearStatus()
    setIsSubmitting(true)
    try {
      if (authToken) await request('/api/auth/logout', { method: 'POST', token: authToken })
      clearAuth()
      setOk('Logged out')
      setView('login')
    } catch (err) {
      clearAuth()
      setError(err instanceof Error ? err.message : 'Logout failed')
      setView('login')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
        <AuthNav
          canOpenDashboard={Boolean(authToken)}
          canOpenProfile={Boolean(authToken)}
          disabled={isSubmitting}
          onSelect={(nextView) => {
            clearStatus()
            setView(nextView)
          }}
        />

        <StatusBanner status={status} />

        {view === 'login' && (
          <Login
            form={loginForm}
            disabled={isSubmitting}
            onChange={(patch) => setLoginForm((prev) => ({ ...prev, ...patch }))}
            onSubmit={handleLogin}
          />
        )}

        {view === 'register' && (
          <Register
            form={registerForm}
            disabled={isSubmitting}
            onChange={(patch) => setRegisterForm((prev) => ({ ...prev, ...patch }))}
            onSubmit={handleRegister}
          />
        )}

        {view === 'dashboard' && (
          <DashboardView
            authToken={authToken}
            displayName={profile.fullName || username}
            disabled={isSubmitting}
            onGoToLogin={() => {
              clearStatus()
              setView('login')
            }}
            onViewProfile={() => {
              clearStatus()
              setView('profile')
            }}
          />
        )}

        {view === 'profile' && (
          <ViewProfile
            fullName={profile.fullName || username}
            email={profile.email}
            disabled={isSubmitting}
            onBack={() => setView('dashboard')}
            onLogout={handleLogout}
          />
        )}
      </div>
    </>
  )
}

function AuthNav({ canOpenDashboard, canOpenProfile, disabled, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
      {!canOpenDashboard ? (
        <>
          <button onClick={() => onSelect('login')} disabled={disabled}>
            Login
          </button>
          <button onClick={() => onSelect('register')} disabled={disabled}>
            Register
          </button>
        </>
      ) : (
        <>
          <button onClick={() => onSelect('dashboard')} disabled={disabled}>
            Dashboard
          </button>
          <button onClick={() => onSelect('profile')} disabled={disabled || !canOpenProfile}>
            Profile
          </button>
        </>
      )}
    </div>
  )
}

function StatusBanner({ status }) {
  if (status.type === 'idle') return null

  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        background: status.type === 'ok' ? 'rgba(0, 200, 0, 0.12)' : 'rgba(255, 0, 0, 0.12)',
        color: status.type === 'ok' ? '#0b4' : '#f55',
        textAlign: 'left',
        whiteSpace: 'pre-wrap',
      }}
    >
      {status.message}
    </div>
  )
}

function DashboardView({ authToken, displayName, disabled, onGoToLogin, onViewProfile }) {
  return (
    <div style={{ textAlign: 'left', display: 'grid', gap: 12 }}>
      {!authToken ? (
        <div>
          <div style={{ marginBottom: 8 }}>Not logged in.</div>
          <button onClick={onGoToLogin} disabled={disabled}>
            Go to login
          </button>
        </div>
      ) : (
        <>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Welcome  {displayName || '—'} ! :) </div>
     
          </div>
          <button onClick={onViewProfile} disabled={disabled}>
            View profile
          </button>
        </>
      )}
    </div>
  )
}

export default App
