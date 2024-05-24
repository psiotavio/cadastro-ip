import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import "./Home.css";
import CustomForm from "../components/Form/CustomForm.tsx";
import CustomButton from "../components/Button/CustomButton.tsx";
import CustomModal from "../components/Modal/CustomModal.tsx";
import PacienteService from "../Objects/PacienteService.ts";
import { IPaciente } from "../Objects/Paciente.ts";

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

        <br/>
        <hr style={{width:"75%"}}/>
        <h3>Estilos de fonte</h3>
        <br/>
        <h1>H1: Cadastro</h1>
        <h2>H2: Cadastro</h2>
        <h3>H3: Cadastro</h3>
        <h4>H4: Cadastro</h4>
        <p>P:  Cadastro</p>
        <hr style={{width:"75%"}}/>
        <h3>Componente botão</h3>
        <br/>

       

        <CustomButton
          text={"Abrir Modal"}
          onClick={handleOpenModal}
        ></CustomButton>
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <CustomForm />
        </CustomModal>

        <hr style={{width:"75%"}}/>
        <h3>Exemplo de link</h3>
        <br/>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>


        <hr style={{width:"75%"}}/>
        <h3>DEVE LISTAR OS PACIENTES CADASTRADOS AQUI</h3>
        <br/>
        {pacientes.length > 0 ? (
        <ul>
          {pacientes.map((paciente, index) => (
            <li key={index}>
              Nome: {paciente.name}, CPF: {paciente.cpf}, Data de Nascimento: {paciente.dateOfBirth}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum paciente cadastrado.</p>
      )}


      </header>
    </div>
  );
}

export default Home;
