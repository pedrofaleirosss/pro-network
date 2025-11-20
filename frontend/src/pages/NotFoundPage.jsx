const NotFoundPage = () => {
  return (
    <div className="flex-1 flex items-center justify-center px-4 min-h-screen">
      <div className="text-center max-w-2xl">
        {/* 404 Illustration */}
        <div className="mb-8 text-9xl font-bold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          404
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Página não encontrada
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Desculpe, a página que você está procurando não existe ou foi movida.
          Mas não se preocupe, você pode voltar para a página inicial ou
          explorar nossos profissionais.
        </p>

        {/* Search Illustration */}
        <div className="mb-12">
          <div className="inline-block text-6xl">🔍</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Voltar para o Início
          </a>
          <a
            href="/"
            className="px-8 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
          >
            Explorar Profissionais
          </a>
        </div>

        {/* Help Text */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Ainda precisa de ajuda? Entre em contato com nosso{" "}
            <a
              href="/"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              suporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
