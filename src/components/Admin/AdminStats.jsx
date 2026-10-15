import "./AdminStats.css";

export function AdminStats({ total, filtered, loading }) {
  return (
    <section className="admin-stats">
      <article className="admin-stat-card">
        <span>Total products</span>
        <strong>{loading ? "—" : total}</strong>
      </article>

      <article className="admin-stat-card">
        <span>Filtered results</span>
        <strong>{loading ? "—" : filtered}</strong>
      </article>
    </section>
  );
}
