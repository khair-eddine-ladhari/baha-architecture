const Footer = () => {

  const LINK_CLS =
    "text-[0.65rem] uppercase tracking-widest font-bold text-black hover:opacity-40 transition-opacity duration-[250ms]";

  return (
      <footer className="border-t border-black px-6 py-1.5">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <li className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">
              developed by KHAIR EDDINE LADHARI
            </li>
          <ul className="flex flex-wrap gap-6 items-center">
            {["Contact", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a href="#" className={LINK_CLS}>
                  {item}
                </a>
              </li>
            ))}
            <li className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">
              © Baha Architecture
            </li>
          </ul>
        </div>
      </footer>
  );
};

export default Footer;