export default function Login({ form, disabled, onChange, onSubmit, onSwitch }) {
  const initials = (() => {
    const src = (form.username || '').trim()
    if (!src) return 'U'
    const parts = src.split(/\s+/).filter(Boolean)
    const chars = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2)
    return chars.toUpperCase()
  })()

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'grid',
        gap: 14,
        textAlign: 'left',
        padding: 16,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
        background: '#fff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            background: '#eef2ff',
            color: '#4f46e5',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
          }}
        >
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>Welcome back</div>
          <div style={{ color: '#6b7280', fontSize: 13 }}>Sign in to continue</div>
        </div>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <div style={{ fontSize: 13, color: '#374151' }}>Username</div>
        <input
          value={form.username}
          onChange={(e) => onChange({ username: e.target.value })}
          placeholder="username"
          autoComplete="username"
          required
          minLength={3}
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #d1d5db',
          }}
        />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <div style={{ fontSize: 13, color: '#374151' }}>Password</div>
        <input
          value={form.password}
          onChange={(e) => onChange({ password: e.target.value })}
          type="password"
          placeholder="password"
          autoComplete="current-password"
          required
          minLength={6}
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #d1d5db',
          }}
        />
      </label>

      <button
        type="submit"
        disabled={disabled}
        style={{
          padding: '10px 14px',
          borderRadius: 8,
          border: '1px solid #4f46e5',
          background: disabled ? '#c7d2fe' : '#4f46e5',
          color: '#fff',
          fontWeight: 600,
        }}
      >
        {disabled ? 'Logging in…' : 'Login'}
      </button>

      <div style={{ fontSize: 13, color: '#6b7280', textAlign: 'center' }}>
        Don’t have an account?{' '}
        <button
          type="button"
          onClick={() => onSwitch && onSwitch('register')}
          disabled={disabled}
          style={{
            color: '#4f46e5',
            textDecoration: 'underline',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Sign up
        </button>
      </div>
    </form>
  )
}
