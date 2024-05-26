import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import "./Home.css";
import CustomForm from "../components/Form/CustomForm.tsx";
import CustomButton from "../components/Button/CustomButton.tsx";
import CustomModal from "../components/Modal/CustomModal.tsx";
import PacienteService from "../Objects/PacienteService.ts";
import { IPaciente } from "../Objects/Paciente.ts";
import CustomTable from "../components/Tabela/CustomTable.tsx";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacientes, setPacientes] = useState<IPaciente[]>([]);

  useEffect(() => {
    const pacienteService = PacienteService.getInstance();
    setPacientes(pacienteService.getPacientes());
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-register-button">
          <CustomButton
            text={"Cadastrar novo paciente"}
            onClick={handleOpenModal}
          ></CustomButton>
        </div>
      </header>

      <div className="App-content">
        <h1>PACIENTES CADASTRADOS</h1>
        <CustomTable patients={pacientes} />
      </div>

      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CustomForm />
      </CustomModal>
    </div>
  );
}

export default Home;
