import { useState } from "react";
import { Music, Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Hjem", href: "/" },
    { name: "Noder", href: "/noder" },
    { name: "Kalender", href: "/kalender" },
    { name: "Om", href: "/om" },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    navigate("/login");
  };

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
              <li>
                <button
                  onClick={handleLogout}
                  className="text-lg font-semibold hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log ud</span>
                </button>
              </li>
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
              <li>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="block text-lg font-semibold hover:text-white transition-colors duration-200 py-2 flex items-center space-x-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log ud</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
