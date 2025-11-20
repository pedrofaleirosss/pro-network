const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-100 border-t border-slate-700 dark:border-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ProNetwork
            </h3>
            <p className="text-sm text-slate-300">
              Conectando profissionais, competências e propósito por meio da
              tecnologia.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-100">Plataforma</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a
                  href="/profissionais"
                  className="hover:text-blue-400 transition-colors"
                >
                  Profissionais
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Oportunidades
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Comunidade
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-100">Empresa</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Carreiras
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-100">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Cookies
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Acessibilidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 dark:border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400 mb-4 md:mb-0">
              {`© ${currentYear} ProNetwork. Todos os direitos reservados.`}
            </p>
            <div className="flex gap-6">
              <a
                href="/"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="/"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                Twitter
              </a>
              <a
                href="/"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href="/"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
