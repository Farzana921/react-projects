import { motion } from "framer-motion";

export default function CountryCard({ country }) {
  const name = country?.name?.common ?? "Unknown";
  const region = country?.region ?? "Unknown";
  const population = country?.population ?? 0;

  const flagUrl = country?.flags?.png || country?.flags?.svg || "";
  const flagAlt = country?.flags?.alt || `${name} flag`;

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      layout
    >
      {flagUrl ? (
        <img
          className="flag"
          src={flagUrl}
          alt={flagAlt}
          loading="lazy"
        />
      ) : (
        <div className="flag" />
      )}

      <div className="cardBody">
        <h3 className="title">{name}</h3>

        <p className="meta">
          <span>Region</span>
          <strong>{region}</strong>
        </p>

        <p className="meta">
          <span>Population</span>
          <strong>{population.toLocaleString()}</strong>
        </p>
      </div>
    </motion.div>
  );
}
