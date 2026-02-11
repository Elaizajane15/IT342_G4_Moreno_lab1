export default function ViewProfile({ username, fullName, email, disabled, onBack, onLogout }) {
  const initials = (() => {
    const src = (fullName || username || email || '').trim()
    if (!src) return 'U'
    const parts = src.split(/\s+/).filter(Boolean)
    const chars = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2)
    return chars.toUpperCase()
  })()

  return (
    <div
      style={{
        textAlign: 'left',
        display: 'grid',
        gap: 14,
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
            width: 64,
            height: 64,
            borderRadius: 999,
            background: '#eef2ff',
            color: '#4f46e5',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 18 }}>{fullName || username || '—'}</div>
          <div style={{ color: '#6b7280', fontSize: 13 }}>{email || '—'}</div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 10,
          borderTop: '1px solid #f3f4f6',
          paddingTop: 10,
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8 }}>
          <div style={{ color: '#6b7280', fontSize: 13 }}>Username</div>
          <div style={{ fontWeight: 500 }}>{username || '—'}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8 }}>
          <div style={{ color: '#6b7280', fontSize: 13 }}>Full name</div>
          <div style={{ fontWeight: 500 }}>{fullName || '—'}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8 }}>
          <div style={{ color: '#6b7280', fontSize: 13 }}>Email</div>
          <div style={{ fontWeight: 500 }}>{email || '—'}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div
          style={{
            padding: 12,
            borderRadius: 10,
            border: '1px solid #e5e7eb',
            background: '#fafafa',
          }}
        >
          <div style={{ fontSize: 12, color: '#6b7280' }}>Status</div>
          <div style={{ fontWeight: 600 }}>Active</div>
        </div>
        <div
          style={{
            padding: 12,
            borderRadius: 10,
            border: '1px solid #e5e7eb',
            background: '#fafafa',
          }}
        >
          <div style={{ fontSize: 12, color: '#6b7280' }}>Role</div>
          <div style={{ fontWeight: 600 }}>User</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={onBack}
          disabled={disabled}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #d1d5db',
            background: '#fff',
          }}
        >
          Back to dashboard
        </button>
        <button
          onClick={onLogout}
          disabled={disabled}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #ef4444',
            background: disabled ? '#fecaca' : '#ef4444',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          {disabled ? 'Logging out…' : 'Logout'}
        </button>
      </div>
    </div>
  )
}
