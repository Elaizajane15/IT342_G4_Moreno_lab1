export default function Login({ form, disabled, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10, textAlign: 'left' }}>
      <label>
        Username
        <input
          value={form.username}
          onChange={(e) => onChange({ username: e.target.value })}
          placeholder="username"
          autoComplete="username"
          required
        />
      </label>
      <label>
        Password
        <input
          value={form.password}
          onChange={(e) => onChange({ password: e.target.value })}
          type="password"
          placeholder="password"
          autoComplete="current-password"
          required
        />
      </label>
      <button type="submit" disabled={disabled}>
        {disabled ? 'Logging in…' : 'Login'}
      </button>
    </form>
  )
}
