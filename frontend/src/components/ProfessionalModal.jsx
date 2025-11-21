"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function ProfessionalModal({
  professional,
  isRecommended,
  onClose,
  onRecommend,
}) {
  const [activeTab, setActiveTab] = useState("about");
  const [isWritingMessage, setIsWritingMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

  const openMessageBox = () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id || null;

    if (!userId) {
      return Swal.fire({
        title: "Você precisa estar logado para enviar mensagens.",
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

    setIsWritingMessage(true);
  };
  const closeMessageBox = () => {
    setMessageText("");
    setIsWritingMessage(false);
  };

  const sendMessage = async (professionalId) => {
    if (!messageText.trim()) return alert("Digite uma mensagem!");

    const userId = JSON.parse(localStorage.getItem("user"))?.id || null;

    if (!userId) {
      return Swal.fire({
        title: "Você precisa estar logado para enviar mensagens.",
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

    const response = await fetch("http://localhost:3000/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        professionalId,
        userId,
        content: messageText,
      }),
    });

    if (response.ok) {
      Swal.fire("Sucesso", "Mensagem enviada!", "success");
      closeMessageBox();
    } else {
      Swal.fire("Erro", "Falha ao enviar mensagem.", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl dark:shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-6 flex items-start justify-between">
          <div className="flex items-center gap-4 flex-1">
            <img
              src={professional.foto || "/placeholder.svg"}
              alt={professional.nome}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">
                {professional.nome}
              </h2>
              <p className="text-blue-50 font-semibold">{professional.cargo}</p>
              <p className="text-blue-100 text-sm mt-1">
                📍 {professional.localizacao}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300 text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Bio */}
          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {professional.resumo}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
            {[
              { id: "about", label: "Sobre", emoji: "ℹ️" },
              { id: "experience", label: "Experiência", emoji: "💼" },
              { id: "skills", label: "Habilidades", emoji: "⚙️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                    : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-300"
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "about" && (
            <div className="space-y-6">
              {/* Skills */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  ⚙️ Habilidades Técnicas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {professional.habilidadesTecnicas.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium text-sm border border-blue-200 dark:border-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  💭 Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {professional.softSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium text-sm border border-purple-200 dark:border-purple-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interesses */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  🎯 Áreas de Interesse
                </h3>
                <div className="flex flex-wrap gap-2">
                  {professional.interesses.map((interesse, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm"
                    >
                      {interesse}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-6">
              {professional.experiencias.length > 0 ? (
                <>
                  {professional.experiencias.map((exp, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-blue-500 pl-4 py-2"
                    >
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {exp.cargo}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        {exp.empresa}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {exp.inicio} - {exp.fim}
                      </p>
                      <p className="text-slate-700 dark:text-slate-300 mt-2">
                        {exp.descricao}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-slate-600 dark:text-slate-400">
                  Sem experiências registradas
                </p>
              )}

              {/* Formação */}
              <div className="mt-8">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  🎓 Formação Acadêmica
                </h4>
                <div className="space-y-3">
                  {professional.formacao.map((form, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-200 dark:border-slate-600"
                    >
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {form.curso}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {form.instituicao} - {form.ano}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificações */}
              {professional.certificacoes.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    🏅 Certificações
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {professional.certificacoes.map((cert, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-sm font-medium border border-amber-200 dark:border-amber-800"
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Habilidades Técnicas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {professional.habilidadesTecnicas.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                      <span className="text-slate-900 dark:text-slate-100 font-medium">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Idiomas
                </h3>
                <div className="space-y-2">
                  {professional.idiomas.map((idioma, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600"
                    >
                      <span className="font-medium text-slate-900 dark:text-white">
                        {idioma.idioma}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-600 px-3 py-1 rounded-full">
                        {idioma.nivel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {professional.projetos.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Projetos
                  </h3>
                  <div className="space-y-3">
                    {professional.projetos.map((projeto, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:shadow-md transition-all duration-300"
                      >
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                          {projeto.titulo}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                          {projeto.descricao}
                        </p>
                        <a
                          href={projeto.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                        >
                          Ver Projeto →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {isWritingMessage && (
          <div className="mt-4 flex flex-col gap-2 py-6 px-6 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
            <textarea
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
              rows={3}
              placeholder="Digite sua mensagem..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={() => sendMessage(professional.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
              >
                Enviar
              </button>

              <button
                onClick={closeMessageBox}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-6 flex gap-3">
          <button
            onClick={onRecommend}
            className={`flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isRecommended
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50"
            }`}
          >
            {isRecommended ? "✅ Recomendado" : "👍 Recomendar"}
          </button>
          <button
            onClick={openMessageBox}
            className={`flex-1 flex items-center cursor-pointer justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${"bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50"}`}
          >
            💬 Mensagem
          </button>
        </div>
      </div>
    </div>
  );
}
