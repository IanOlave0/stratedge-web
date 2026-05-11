import { STRINGS } from '../i18n/strings';

/**
 * Componente Footer
 * * Pie de página con marca y enlaces legales.
 * * Usa i18n strings para todo el texto visible.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { footer } = STRINGS;

  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Marca y Derechos */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <span className="text-emerald-400 font-bold text-lg">{footer.brandName}</span> {footer.brandSuffix}
          <p className="text-sm mt-1">{footer.copyright(currentYear)}</p>
        </div>

        {/* Enlaces Legales */}
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-emerald-400 transition-colors">{footer.links.privacy}</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">{footer.links.terms}</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">{footer.links.instagram}</a>
        </div>
      </div>
    </footer>
  );
}
