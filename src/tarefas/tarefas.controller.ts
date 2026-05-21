import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { TarefasService } from './tarefas.service';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Get()
  listar(
    @Query('prioridade') prioridade?: 1 | 2 | 3 | 4 | 5,
    @Query('limite', new DefaultValuePipe(10), ParseIntPipe) limite?: number,
  ) {
    return this.tarefasService.listar(prioridade, limite);
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.tarefasService.buscarPorId(id);
  }

  @Post()
  criar(@Body() body: CreateTarefaDto) {
    return this.tarefasService.criar(body);
  }

  @Put(':id')
  atualizarCompleto(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateTarefaDto,
  ) {
    return this.tarefasService.atualizarCompleto(id, body);
  }

  @Patch(':id')
  atualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTarefaDto,
  ) {
    return this.tarefasService.atualizarParcial(id, body);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.tarefasService.remover(id);
  }
}
