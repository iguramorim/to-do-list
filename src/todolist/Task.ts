export class Task {
  descricao: string;
  concluida: boolean;
  guardarDescricao: { descricao: string; concluida: boolean }[] = [];

  constructor(descricao: string) {
    this.descricao = descricao;
    this.concluida = false;
  }

  adicionarDescricao() {
    this.guardarDescricao.push({
      descricao: this.descricao,
      concluida: this.concluida,
    });
  }

  delete(index: number) {
    this.guardarDescricao.splice(index, 1);
  }

  update(index: number, novaDescricao: string) {
    if (novaDescricao.trim()) {
      this.guardarDescricao[index].descricao = novaDescricao;
    }
  }

  toggleConcluida(index: number) {
    this.guardarDescricao[index].concluida =
      !this.guardarDescricao[index].concluida;
  }
}
