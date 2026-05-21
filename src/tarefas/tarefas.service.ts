import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

type Tarefa = {
  id: number;
  titulo: string;
  descricao: string;
  status: 'aberta' | 'em_andamento' | 'concluida';
  prioridade: 1 | 2 | 3 | 4 | 5;
};

@Injectable()
export class TarefasService {
  private tarefas: Tarefa[] = [
    {
      id: 1,
      titulo: 'Configurar projeto',
      descricao: 'Instalar dependencias e validar o NestJS',
      status: 'concluida',
      prioridade: 5,
    },
    {
      id: 2,
      titulo: 'Criar modulo tarefas',
      descricao: 'Gerar module, controller e service',
      status: 'em_andamento',
      prioridade: 5,
    },
    {
      id: 3,
      titulo: 'Implementar listagem',
      descricao: 'Criar rota GET /tarefas',
      status: 'aberta',
      prioridade: 3,
    },
    {
      id: 4,
      titulo: 'Testar no Thunder Client',
      descricao: 'Salvar requests da pratica',
      status: 'aberta',
      prioridade: 1,
    },
  ];

  listar(prioridade?: 1 | 2 | 3 | 4 | 5, limite?: number) {
    let resultado = [...this.tarefas];

    if (prioridade) {
      resultado = resultado.filter((p) => p.prioridade === prioridade);
    }

    if (limite && limite > 0) {
      resultado = resultado.slice(0, limite);
    }

    return resultado;
  }

  buscarPorId(id: number) {
    const tarefa = this.tarefas.find((p) => p.id === id);

    if (!tarefa) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return tarefa;
  }

  criar(dados: CreateTarefaDto) {
    const novoId =
      this.tarefas.length > 0
        ? Math.max(...this.tarefas.map((p) => p.id)) + 1
        : 1;

    const novaTarefa: Tarefa = { id: novoId, ...dados };
    this.tarefas.push(novaTarefa);
    return novaTarefa;
  }

  atualizarCompleto(id: number, dados: CreateTarefaDto) {
    const indice = this.tarefas.findIndex((p) => p.id === id);

    if (indice === -1) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    const atualizado: Tarefa = { id, ...dados };
    this.tarefas[indice] = atualizado;
    return atualizado;
  }

  atualizarParcial(id: number, dados: UpdateTarefaDto) {
    const tarefa = this.buscarPorId(id);
    const atualizado = { ...tarefa, ...dados };

    this.tarefas = this.tarefas.map((p) => (p.id === id ? atualizado : p));
    return atualizado;
  }

  remover(id: number) {
    const existe = this.tarefas.some((p) => p.id === id);

    if (!existe) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    this.tarefas = this.tarefas.filter((p) => p.id !== id);
    return { mensagem: `Tarefa ${id} removida com sucesso` };
  }
}
