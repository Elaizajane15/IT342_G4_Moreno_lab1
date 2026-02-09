export default function ViewProfile({ fullName, email, disabled, onBack, onLogout }) {
  return (
    <div style={{ textAlign: 'left', display: 'grid', gap: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Profile</div>
      <div>Full name: {fullName || '—'}</div>
      <div>Email: {email || '—'}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onBack} disabled={disabled}>
          Back to dashboard
        </button>
        <button onClick={onLogout} disabled={disabled}>
          {disabled ? 'Logging out…' : 'Logout'}
        </button>
      </div>
    </div>
  )
}
