import { Link } from "react-router-dom";
import { Music } from "lucide-react";

export default function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Sheet Music", href: "/sheets" },
    { name: "About", href: "/about" },
    { name: "Metronome", href: "/metronome" },
  ];

  return (
    <header className="bg-[#8B4513] text-[#FFE4B5] p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Music className="h-8 w-8" />
            <span className="text-xl font-bold">Music Reader Assistant</span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-lg font-semibold hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
