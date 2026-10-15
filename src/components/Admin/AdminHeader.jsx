import "./AdminHeader.css";

export function AdminHeader({ onLogout }) {
  return (
    <header className="admin-header">
      <div>
        <p className="admin-eyebrow">STORE MANAGEMENT</p>
        <h1>Admin dashboard</h1>
        <p className="admin-subtitle">
          Manage your shop's products and translations.
        </p>
      </div>

      <button
        type="button"
        className="admin-button admin-button-secondary"
        onClick={onLogout}
      >
        Log out
      </button>
    </header>
  );
}
