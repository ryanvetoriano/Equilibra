import type { TipoCategoria } from "./TipoCategoria";
import type { User } from "./TipoUser";

export interface TipoTarefa {
  idTarefa: number;
  titulo: string;
  descricao: string;
  duracaoMin: number;
  dataTarefa: string;
  usuario: User;
  categoria: TipoCategoria;
}