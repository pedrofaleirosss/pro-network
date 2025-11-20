"use client";

export default function FilterBar({
  areas,
  cities,
  skills,
  selectedArea,
  selectedCity,
  selectedSkill,
  onAreaChange,
  onCityChange,
  onSkillChange,
}) {
  const hasFilters = selectedArea || selectedCity || selectedSkill;

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Area Filter */}
        <select
          value={selectedArea}
          onChange={(e) => onAreaChange(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
        >
          <option value="">Todas as áreas</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>

        {/* City Filter */}
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
        >
          <option value="">Todas as cidades</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Skill Filter */}
        <select
          value={selectedSkill}
          onChange={(e) => onSkillChange(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
        >
          <option value="">Todas as habilidades</option>
          {skills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {hasFilters && (
          <button
            onClick={() => {
              onAreaChange("");
              onCityChange("");
              onSkillChange("");
            }}
            className="px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-300 flex items-center gap-2 font-medium"
          >
            ✕ Limpar filtros
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          {selectedArea && (
            <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
              Área: {selectedArea}
              <button
                onClick={() => onAreaChange("")}
                className="hover:text-blue-900 dark:hover:text-blue-100"
              >
                ✕
              </button>
            </span>
          )}
          {selectedCity && (
            <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
              Cidade: {selectedCity}
              <button
                onClick={() => onCityChange("")}
                className="hover:text-blue-900 dark:hover:text-blue-100"
              >
                ✕
              </button>
            </span>
          )}
          {selectedSkill && (
            <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
              Skill: {selectedSkill}
              <button
                onClick={() => onSkillChange("")}
                className="hover:text-blue-900 dark:hover:text-blue-100"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
