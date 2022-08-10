import { Dropdown } from "flowbite-react";
import { Gear, Moon, Receipt, SunDim } from "phosphor-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function NavbarMenu() {
  const auth = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="py-3">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex items-center gap-2 text-green-600">
          <div className="flex flex-col text-xl font-semibold whitespace-nowrap tracking-widest">
            <span>WHERE'S THE</span>
            <span className="flex items-center gap-3 font-thin">MONEY? <Receipt size={20} weight="fill" /></span>
          </div>          
        </div>
        <div className="flex gap-10 z-10">
          {
            theme === "light" ?
              <button className="text-[#52525b] hover:text-blue-500 transition-colors" onClick={() => setTheme("dark")}>
                <Moon size={25} weight="bold" />
              </button> :
              <button className="text-[#52525b] hover:text-yellow-400 transition-colors" onClick={() => setTheme("light")}>
                <SunDim size={25} weight="bold" />
              </button>
          }
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Gear size={25} color="#52525b" weight="fill" />}
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {auth.user?.name}
              </span>
              <span className="block truncate text-xs font-thin">
                {auth.user?.email}
              </span>
            </Dropdown.Header>
            {/* <Dropdown.Item>
              Alterar senha
            </Dropdown.Item> 
            <Dropdown.Divider /> */}
            <Dropdown.Item onClick={auth.Logout}>
              Sair
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </nav>

  );
}