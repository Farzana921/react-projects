 function Badge({ label, value }) {
  return (
    <p style={{ margin: "6px 0" }}>
      <strong>{label}:</strong> {value}
    </p>
  );
 }

 export default Badge;
