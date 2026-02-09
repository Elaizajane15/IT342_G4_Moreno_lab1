export default function Register({ form, disabled, onChange, onSubmit }) {
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
        Email
        <input
          value={form.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="name@example.com"
          autoComplete="email"
          required
        />
      </label>
      <label>
        Full name (optional)
        <input
          value={form.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          placeholder="Your Name"
          autoComplete="name"
        />
      </label>
      <label>
        Password
        <input
          value={form.password}
          onChange={(e) => onChange({ password: e.target.value })}
          type="password"
          placeholder="password"
          autoComplete="new-password"
          required
        />
      </label>
      <button type="submit" disabled={disabled}>
        {disabled ? 'Registering…' : 'Register'}
      </button>
    </form>
  )
}
