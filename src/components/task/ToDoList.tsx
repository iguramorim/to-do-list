"use client";

import { Task } from "@/todolist/Task";
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
import { FilePenLine, Save, Trash } from "lucide-react";
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
  const [tarefas, setTarefas] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [novaDescricao, setNovaDescricao] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (descricao.trim()) {
      const task = new Task(descricao);
      task.adicionarDescricao();
      setTarefas([...tarefas, ...task.guardarDescricao]);
      setDescricao("");
    }
  };

  const handleDelete = (index: number) => {
    const task = new Task("");
    task.guardarDescricao = [...tarefas];
    task.delete(index);
    setTarefas(task.guardarDescricao);
  };

  const handleUpdate = (index: number) => {
    if (novaDescricao.trim()) {
      const task = new Task("");
      task.guardarDescricao = [...tarefas];
      task.update(index, novaDescricao);
      setTarefas(task.guardarDescricao);
      setEditIndex(null);
      setNovaDescricao("");
    }
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
            <Button size={"lg"} type="submit">
              Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2 mt-5">
        {tarefas.map((item, index) => (
          <Card key={index} className="shadow-md p-4 hover:border-gray-300">
            <CardContent className="p-0">
              <div className="flex justify-between items-center">
                <p className="capitalize">{item}</p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setEditIndex(index);
                      setNovaDescricao(item);
                    }}
                    variant={"outline"}
                    className="hover:text-yellow-500"
                  >
                    <FilePenLine />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="hover:text-red-500"
                      >
                        <Trash />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Tem certeza de que deseja deletar?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {item.toLocaleUpperCase()} será removido e essa ação
                          não poderá ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
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
                    variant={"outline"}
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
