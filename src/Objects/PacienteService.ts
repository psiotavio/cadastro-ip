import { IPaciente } from "./Paciente";

class PacienteService {
  private static instance: PacienteService;
  private pacientes: IPaciente[];
  private lastId: number;

  private constructor() {
    this.pacientes = this.loadPacientes();
    this.lastId = this.pacientes.reduce((maxId, paciente) => Math.max(paciente.id, maxId), 0);
  }

  public static getInstance(): PacienteService {
    if (!PacienteService.instance) {
      PacienteService.instance = new PacienteService();
    }
    return PacienteService.instance;
  }

  public addPaciente(paciente: IPaciente): string {
    if (this.pacientes.some(p => p.cpf === paciente.cpf)) {
      return "CPF já cadastrado.";
    }

    paciente.id = ++this.lastId;
    this.pacientes.push(paciente);
    this.savePacientes();
    return "Paciente adicionado com sucesso.";
  }

  public getPacientes(): IPaciente[] {
    return this.pacientes;
  }

  private savePacientes(): void {
    localStorage.setItem('pacientes', JSON.stringify(this.pacientes));
  }

  private loadPacientes(): IPaciente[] {
    const savedPacientes = localStorage.getItem('pacientes');
    return savedPacientes ? JSON.parse(savedPacientes) : [];
  }

  updatePaciente(id: number, updatedData: IPaciente): void {
    const index = this.pacientes.findIndex(p => p.id === id);
    if (index === -1) return; 

    if (updatedData.cpf) {
      const cpfExists = this.pacientes.some(p => p.cpf === updatedData.cpf && p.id !== id);
      if (cpfExists) {
        console.error("CPF já cadastrado para outro paciente.");
        return; 
      }
    }

    this.pacientes[index] = { ...this.pacientes[index], ...updatedData };
    this.savePacientes(); 
  }

  public cleanStorage(): void {
    localStorage.removeItem('pacientes'); 
    this.pacientes = []; 
    this.lastId = 0; 
  }

}

export default PacienteService;
