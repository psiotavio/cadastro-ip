import { IPaciente } from "./Paciente";

class PacienteService {
  private static instance: PacienteService;
  private pacientes: IPaciente[];

  private constructor() {
    this.pacientes = this.loadPacientes();
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
}

export default PacienteService;
