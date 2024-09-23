import React, { useState } from "react";
import "./style.css";

export const Box = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="w-[1920px] h-[962px] relative">
      {/* Background */}
      <div className="w-[1920px] h-[962px] left-0 top-0 absolute bg-[#f1f1f1]" />
      <div className="w-[1920px] h-[100px] left-0 top-0 absolute bg-[#273858] flex items-center justify-between px-4 z-10">
        {/* Navbar items */}
        <div className="flex items-center space-x-8">
          <div className="text-white text-2xl font-['Chenla']">Home</div>
          <div className="text-white text-2xl font-['Chenla']">Placar Online</div>
          
          {/* Dropdown for Competições */}
          <div className="relative">
            <button
              className="text-white text-2xl font-['Chenla']"
              onClick={toggleDropdown}
            >
              Competições
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Listar Competições
                </a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Minhas Competições
                </a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Cadastrar Competição
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-[#4f813d] text-white text-xl font-['Chenla'] px-6 py-2 rounded">
            Entrar
          </button>
          <button className="bg-[#5f7f9d] text-white text-xl font-['Chenla'] px-6 py-2 rounded">
            Criar Conta
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-[922px] h-[471px] left-[25px] top-[457px] absolute bg-white" />
      <div className="w-[1869px] h-[298px] left-[25px] top-[131px] absolute bg-[#a33c3c]" />
      <div className="w-[922px] h-[471px] left-[972px] top-[457px] absolute bg-white" />
      <div className="w-[922px] h-[87px] left-[25px] top-[457px] absolute bg-[#273858]">
        <div className="left-[267px] top-[13px] absolute text-center text-white text-4xl font-['Chenla']">
          Próximas Competições
        </div>
      </div>
      <div className="w-[922px] h-[87px] left-[972px] top-[457px] absolute bg-[#273858]">
        <div className="left-[392px] top-[13px] absolute text-center text-white text-4xl font-['Chenla']">
          Ranking
        </div>
      </div>
    </div>
  );
};
