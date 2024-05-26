import React, { useState } from "react";
import CustomInput from "../Input/CustomInput.tsx";
import CustomDatePicker from "../DatePicker/CustomDatePicker.tsx";
import CustomDropdown from "../DropDown/CustomDropDown.tsx";
import CustomButton from "../Button/CustomButton.tsx";
import PacienteService from "../../Objects/PacienteService.ts";

function CustomForm() {
  const [selectedDate, setSelectedDate] = useState('');
  const [genderSelectedValue, setGenderSelectedValue] = useState('');
  const [statusSelectedValue, setStatusSelectedValue] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const pacienteService = PacienteService.getInstance();

  const handleDateChange = (value: any) => {
    setSelectedDate(value.target.value);
  };

  const handleNameChange = (value:any) => {
    setName(value.target.value);
  };

  const handleCPFChange = (value: any) => {
    setCpf(value.target.value);
  };

  const handleAddressChange = (value:any) => {
    setAddress(value.target.value);
  };

  const savePatient = () => {
    if (!name || !cpf || !selectedDate || !genderSelectedValue || !statusSelectedValue) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    const newPatient = {
      id: 0,
      name,
      cpf,
      address, 
      gender: dropdownGenderItems.find(item => item.value === genderSelectedValue)!.label,
      status: dropdownStatusItems.find(item => item.value === statusSelectedValue)!.label,
      dateOfBirth: selectedDate
    };
  
    const result = pacienteService.addPaciente(newPatient);
    alert(result);
    if (result === "Paciente adicionado com sucesso.") {
      setIsButtonDisabled(true);
    }
  };

  const dropdownGenderItems = [
    { label: 'Feminino', value: '1' },
    { label: 'Masculino', value: '2' },
    { label: 'Prefiro não informar', value: '3' }
  ];

  const dropdownStatusItems = [
    { label: 'Ativo', value: '1' },
    { label: 'Inativo', value: '2' },
  ];

  return (
    <div className="form-container">
      <CustomInput
        id="name-input"
        label="Nome"
        required={true}
        placeholder="Digite o nome completo"
        value={name}
        onChange={handleNameChange}
      />
      <CustomDatePicker
        id="date-input"
        label="Data de Nascimento"
        required={true}
        value={selectedDate}
        onChange={handleDateChange}
      />
      <CustomInput
        id="cpf-input"
        label="CPF"
        required={true}
        type="cpf"
        placeholder="Digite seu CPF"
        value={cpf}
        onChange={handleCPFChange}
      />
      <CustomDropdown
        id="dropdown-gender"
        label="Sexo"
        required={true}
        items={dropdownGenderItems}
        value={genderSelectedValue}
        onChange={setGenderSelectedValue}
      />
      <CustomInput
        id="address-input"
        label="Endereço"
        placeholder="Digite seu endereço"
        value={address}
        onChange={handleAddressChange}
      />
      <CustomDropdown
        id="dropdown-status"
        label="Status"
        required={true}
        items={dropdownStatusItems}
        value={statusSelectedValue}
        onChange={setStatusSelectedValue}
      />
      <CustomButton text="Cadastrar" onClick={savePatient} disabled={isButtonDisabled} />
    </div>
  );
}

export default CustomForm;
