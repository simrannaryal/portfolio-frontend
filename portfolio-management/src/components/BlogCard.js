export default function BlogCard({ title, content }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      margin: "10px",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      transition: "transform 0.2s"
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
