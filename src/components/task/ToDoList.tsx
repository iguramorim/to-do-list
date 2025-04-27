"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import {
  FilePenLine,
  Save,
  Trash,
  StickyNote,
  Check,
  LayoutList,
  LayoutGrid,
  Plus,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ToDoList() {
  const [descricao, setDescricao] = useState("");
  const [tarefas, setTarefas] = useState<
    { descricao: string; concluida: boolean }[]
  >([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [novaDescricao, setNovaDescricao] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [layout, setLayout] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (descricao.trim()) {
      const novaTarefa = { descricao, concluida: false };
      setTarefas([...tarefas, novaTarefa]);
      setDescricao("");
    }
  };

  const handleDelete = (index: number) => {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
  };

  const handleUpdate = (index: number) => {
    if (novaDescricao.trim()) {
      const novasTarefas = [...tarefas];
      novasTarefas[index].descricao = novaDescricao;
      setTarefas(novasTarefas);
      setEditIndex(null);
      setNovaDescricao("");
    }
  };

  const toggleConcluida = (index: number) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida;
    setTarefas(novasTarefas);
  };

  useEffect(() => {
    if (inputRef.current && editIndex !== null) {
      inputRef.current.select();
    }
  }, [editIndex]);

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Adicione uma tarefa</CardTitle>
          <CardDescription>Preencha o campo abaixo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite a descrição da tarefa"
                className="flex-1"
              />
            </div>
            <Button size="lg" type="submit">
              <Plus /> Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>

      {tarefas.length > 0 && (
        <Button
          className="my-3"
          variant="outline"
          onClick={() => setLayout(!layout)}
        >
          {layout ? <LayoutList /> : <LayoutGrid />}
        </Button>
      )}

      <div
        className={`${
          layout ? "grid grid-cols-2 gap-2" : "flex flex-col gap-2"
        } transition-all`}
      >
        {tarefas.map((item, index) => (
          <Card
            key={index}
            className={`${
              item.concluida ? "border-accent" : "hover:border-gray-300"
            }`}
          >
            <CardContent>
              <div
                className={`${
                  layout
                    ? "flex flex-col items-start gap-3"
                    : "flex justify-between items-center"
                }`}
              >
                <div
                  className={`capitalize ${
                    item.concluida ? "line-through text-gray-400" : ""
                  }`}
                >
                  {item.descricao}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => toggleConcluida(index)}
                    className="hover:text-green-500"
                  >
                    {item.concluida ? <Check /> : <StickyNote />}
                  </Button>

                  <Button
                    onClick={() => {
                      setEditIndex(index);
                      setNovaDescricao(item.descricao);
                    }}
                    variant="outline"
                    className="hover:text-yellow-500"
                  >
                    <FilePenLine />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="hover:text-red-500">
                        <Trash />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Tem certeza que deseja deletar?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {item.descricao.toUpperCase()} será removido e essa
                          ação não poderá ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            onClick={() => handleDelete(index)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <Trash /> Deletar
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {editIndex === index && (
                <div className="flex gap-2 mt-2">
                  <Input
                    ref={inputRef}
                    value={novaDescricao}
                    onChange={(e) => setNovaDescricao(e.target.value)}
                    placeholder="Nova descrição"
                    onFocus={(e) => e.target.select()}
                    className="capitalize"
                  />
                  <Button
                    onClick={() => handleUpdate(index)}
                    variant="outline"
                    className="hover:text-blue-500"
                  >
                    <Save />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
