import { useState } from "react";
import { Music, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Hjem", href: "/" },
    { name: "Noder", href: "/noder" },
    { name: "Kalender", href: "/kalender" },
    { name: "Om", href: "/om" },
  ];

  return (
    <header className="bg-[#8B4513] text-[#FFE4B5] p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <Music className="h-8 w-8" />
            <span className="text-xl font-bold">Band Mate</span>
          </a>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-lg font-semibold hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="md:hidden text-[#FFE4B5] hover:text-white transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block text-lg font-semibold hover:text-white transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
