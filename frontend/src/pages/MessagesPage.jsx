import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("user"))?.id || null;

  if (!userId) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`http://localhost:3000/messages/${userId}`);
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    };

    fetchMessages();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">
        Minhas Mensagens Enviadas
      </h1>

      {messages.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-xl font-semibold mb-2">
            Nenhuma mensagem enviada
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Envie uma mensagem para algum profissional e ela aparecerá aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Cabeçalho */}
              <div className="flex items-center justify-between mb-4">
                {/* Foto + Nome */}
                <div className="flex items-center gap-4">
                  <img
                    src={msg.professionalPhoto || "/default-avatar.png"}
                    alt={msg.professionalName}
                    className="w-14 h-14 rounded-full object-cover border border-slate-300 dark:border-slate-600 shadow-sm"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {msg.professionalName}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {msg.professionalArea}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(msg.date).toLocaleString("pt-BR")}
                </span>
              </div>

              {/* Conteúdo */}
              <p className="text-slate-800 dark:text-slate-200">
                {msg.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
