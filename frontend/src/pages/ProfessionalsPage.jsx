import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import FilterBar from "../components/FilterBar";
import ProfessionalCard from "../components/ProfessionalCard";
import ProfessionalModal from "../components/ProfessionalModal";
import Swal from "sweetalert2";

const ProfessionalsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [recommendations, setRecommendations] = useState(new Set());
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    async function loadProfessionals() {
      try {
        const res = await fetch("http://localhost:3000/professionals");
        const data = await res.json();
        setProfessionals(data);
      } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
      }
    }

    loadProfessionals();
  }, []);

  useEffect(() => {
    async function loadUserRecommendations() {
      try {
        const token = localStorage.getItem("token"); // ou onde você salva seu JWT
        if (!token) return;

        const res = await fetch("http://localhost:3000/my-recommendations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setRecommendations(new Set(data.myRecommendations));
      } catch (err) {
        console.error("Erro ao buscar recomendações:", err);
      }
    }

    loadUserRecommendations();
  }, []);

  const areas = useMemo(() => {
    return [...new Set(professionals.map((p) => p.area))].sort();
  }, [professionals]);

  const cities = useMemo(() => {
    return [...new Set(professionals.map((p) => p.localizacao))].sort();
  }, [professionals]);

  const skills = useMemo(() => {
    const allSkills = new Set();
    professionals.forEach((p) => {
      p.habilidadesTecnicas.forEach((skill) => allSkills.add(skill));
    });
    return Array.from(allSkills).sort();
  }, [professionals]);

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((professional) => {
      const matchesSearch =
        professional.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professional.cargo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professional.habilidadesTecnicas.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesArea = !selectedArea || professional.area === selectedArea;
      const matchesCity =
        !selectedCity || professional.localizacao === selectedCity;
      const matchesSkill =
        !selectedSkill ||
        professional.habilidadesTecnicas.includes(selectedSkill);

      return matchesSearch && matchesArea && matchesCity && matchesSkill;
    });
  }, [searchQuery, selectedArea, selectedCity, selectedSkill, professionals]);

  const toggleRecommendation = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return Swal.fire({
        title: "Você precisa estar logado para recomendar um profissional.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }

    const res = await fetch(`http://localhost:3000/recommend/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setRecommendations((prev) => {
      const newSet = new Set(prev);
      if (data.recommended) newSet.add(id);
      else newSet.delete(id);
      return newSet;
    });
  };

  return (
    <div>
      <main className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-3 backdrop-blur-sm">
              <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Buscar por nome, cargo ou tecnologia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          areas={areas}
          cities={cities}
          skills={skills}
          selectedArea={selectedArea}
          selectedCity={selectedCity}
          selectedSkill={selectedSkill}
          onAreaChange={setSelectedArea}
          onCityChange={setSelectedCity}
          onSkillChange={setSelectedSkill}
        />

        {/* Results Counter */}
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Mostrando{" "}
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {filteredProfessionals.length}
            </span>{" "}
            de{" "}
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {professionals.length}
            </span>{" "}
            profissionais
          </p>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              isRecommended={recommendations.has(professional.id)}
              onCardClick={() => setSelectedProfessional(professional)}
              onRecommend={() => toggleRecommendation(professional.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProfessionals.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Nenhum profissional encontrado
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Tente ajustar seus filtros ou termos de busca
            </p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedProfessional && (
        <ProfessionalModal
          professional={selectedProfessional}
          isRecommended={recommendations.has(selectedProfessional.id)}
          onClose={() => setSelectedProfessional(null)}
          onRecommend={() => toggleRecommendation(selectedProfessional.id)}
        />
      )}
    </div>
  );
};

export default ProfessionalsPage;
