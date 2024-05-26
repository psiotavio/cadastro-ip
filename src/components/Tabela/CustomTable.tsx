import React, { useState } from "react";
import CustomModal from "../Modal/CustomModal.tsx";
import SearchBar from "../SearchBar/SearchBar.tsx";
import { IPaciente } from "../../Objects/Paciente.ts";
import "./CustomTable.css";
import PacienteService from "../../Objects/PacienteService.ts";
import CustomDropdown from "../DropDown/CustomDropDown.tsx";
import CustomInput from "../Input/CustomInput.tsx";

interface CustomTableProps {
  patients: IPaciente[];
}

const CustomTable: React.FC<CustomTableProps> = ({ patients }) => {
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<IPaciente | null>(null);
  const pacienteService = PacienteService.getInstance();

  const handleOpenModal = (patient: IPaciente) => {
    setEditFormData({ ...patient }); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditChange = (fieldName: string, value: string) => {
    setEditFormData(prev => {
        if (prev === null) return null;

        return {
            ...prev,
            [fieldName]: value || "" 
        } as IPaciente; 
    });
};

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (editFormData) {
        pacienteService.updatePaciente(editFormData.id, editFormData);
        handleCloseModal();
    }
};

  const handleDropdownChange = (name: string) => (value: string) => {
    setEditFormData((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const filteredPatients = patients.filter((patient) => {
    const normalizedPatientName = patient.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const normalizedFilter = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return normalizedPatientName.includes(normalizedFilter);
  });
  
  return (
    <div>
      <SearchBar
        placeholder="Buscar paciente pelo nome..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data Nascimento</th>
            <th>CPF</th>
            <th>Sexo</th>
            <th>Endereço</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.cpf} onClick={() => handleOpenModal(patient)}>
              <td>{patient.name}</td>
              <td>{patient.dateOfBirth}</td>
              <td>{patient.cpf}</td>
              <td>{patient.gender}</td>
              <td>{patient.address || "Não informado"}</td>
              <td>{patient.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && editFormData && (
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <form onSubmit={handleSaveChanges}>
            <CustomInput
              id="edit-name"
              label="Nome"
              type="text"
              value={editFormData.name}
              onChange={(e) => handleEditChange('name', e.target.value)}
            />
            <CustomInput
              id="edit-dateOfBirth"
              label="Data de Nascimento"
              type="date"
              value={editFormData.dateOfBirth}
              onChange={(e) => handleEditChange('dateOfBirth', e.target.value)}
            />
            <CustomInput
              id="edit-cpf"
              label="CPF"
              type="cpf"
              value={editFormData.cpf}
              onChange={(e) => handleEditChange('cpf', e.target.value)}
            />
            <CustomDropdown
              id="edit-gender"
              label="Sexo"
              items={[
                { label: "Feminino", value: "Feminino" },
                { label: "Masculino", value: "Masculino" },
                { label: "Prefiro não informar", value: "Prefiro não informar" },
              ]}
              value={editFormData.gender}
              onChange={handleDropdownChange("gender")}
            />
            <CustomInput
              id="edit-address"
              label="Endereço"
              type="text"
              value={editFormData.address}
              onChange={(e) => handleEditChange('address', e.target.value)}
            />
            <CustomDropdown
              id="edit-status"
              label="Status"
              items={[
                { label: "Ativo", value: "Ativo" },
                { label: "Inativo", value: "Inativo" },
              ]}
              value={editFormData.status}
              onChange={handleDropdownChange("status")}
            />
            <div className="buttons-container">
              <button
                className="button-form-cancel"
                type="button"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button className="button-form-edit" type="submit">
                Salvar Alterações
              </button>
            </div>
          </form>
        </CustomModal>
      )}
    </div>
  );
};

export default CustomTable;
