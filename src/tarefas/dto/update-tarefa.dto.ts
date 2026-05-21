import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class UpdateTarefaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  status?: 'aberta' | 'em_andamento' | 'concluida';

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  prioridade: 1 | 2 | 3 | 4 | 5;
}
