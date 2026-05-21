import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateTarefaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  status: 'aberta' | 'em_andamento' | 'concluida';

  @IsNumber()
  @Min(1)
  @Max(5)
  prioridade: 1 | 2 | 3 | 4 | 5;
}
