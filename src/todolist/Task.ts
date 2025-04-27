export class Task {
  descricao: string;
  guardarDescricao: string[] = [];

  constructor(descricao: string) {
    this.descricao = descricao;
  }

  adicionarDescricao() {
    this.guardarDescricao.push(this.descricao);
  }

  delete(index: number) {
    this.guardarDescricao.splice(index, 1);
  }

  update(index: number, novaDescricao: string) {
    if (novaDescricao.trim()) {
      this.guardarDescricao[index] = novaDescricao;
    }
  }
}
