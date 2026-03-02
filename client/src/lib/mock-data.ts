export type Candidate = {
  id: string;
  dni: string;
  nombre: string;
  zona: 'Norte' | 'Neuquén' | 'Chubut' | 'Santa Cruz';
  rotacion: '14x14' | '21x7' | '28x14';
  estadoMedico: 'Apto' | 'Con Restricciones' | 'Pendiente';
  estado: 'Active' | 'Archived';
};

export const candidates: Candidate[] = [
  {
    id: '1',
    dni: '30111222',
    nombre: 'Ana Molina',
    zona: 'Neuquén',
    rotacion: '14x14',
    estadoMedico: 'Apto',
    estado: 'Active'
  },
  {
    id: '2',
    dni: '29444555',
    nombre: 'Luis Vega',
    zona: 'Chubut',
    rotacion: '21x7',
    estadoMedico: 'Pendiente',
    estado: 'Active'
  },
  {
    id: '3',
    dni: '33111999',
    nombre: 'Carla Rojas',
    zona: 'Norte',
    rotacion: '28x14',
    estadoMedico: 'Con Restricciones',
    estado: 'Archived'
  }
];
