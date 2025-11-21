"use client";

export default function ProfessionalCard({
  professional,
  isRecommended,
  onCardClick,
  onRecommend,
}) {
  return (
    <div onClick={onCardClick} className="group cursor-pointer h-full">
      <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-200 dark:border-slate-700 h-full flex flex-col">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-blue-500/10 to-purple-500/10 pointer-events-none"></div>

        {/* Profile Image */}
        <div className="relative w-full h-32 bg-linear-to-br from-blue-400 via-purple-400 to-pink-400 overflow-hidden">
          <img
            src={professional.foto || "/placeholder.svg"}
            alt={professional.nome}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
            {professional.nome}
          </h3>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 line-clamp-1">
            {professional.cargo}
          </p>

          {/* Location and Area */}
          <div className="flex flex-col gap-2 mb-4 text-xs">
            <p className="text-slate-600 dark:text-slate-400 line-clamp-1">
              📍 {professional.localizacao}
            </p>
            <p className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium w-fit">
              {professional.area}
            </p>
          </div>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {professional.habilidadesTecnicas.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md"
              >
                {skill}
              </span>
            ))}
            {professional.habilidadesTecnicas.length > 3 && (
              <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md">
                +{professional.habilidadesTecnicas.length - 3}
              </span>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRecommend();
              }}
              className={`flex-1 flex cursor-pointer items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                isRecommended
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              }`}
            >
              {isRecommended ? "✅ Recomendado" : "👍 Recomendar"}
            </button>
            <button
              onClick={onCardClick}
              className="flex-1 flex cursor-pointer items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300"
            >
              🔍 Ver Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
