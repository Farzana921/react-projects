export default function CountryCard({ country }) {
  const name = country?.name?.common ?? "Unknown";
  const region = country?.region ?? "Unknown";
  const population = country?.population ?? 0;

  const flagUrl = country?.flags?.png || country?.flags?.svg || "";
  const flagAlt = country?.flags?.alt || `${name} flag`;

  return (
    <div className="card">
      {flagUrl ? (
        <img className="flag" src={flagUrl} alt={flagAlt} loading="lazy" />
      ) : (
        <div className="flag placeholder">No flag</div>
      )}

      <h3 className="title">{name}</h3>
      <p className="meta">Region: {region}</p>
      <p className="meta">Population: {population.toLocaleString()}</p>
    </div>
  );
}
