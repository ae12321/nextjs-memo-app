import React from "react";
import { useToast } from "../ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMemoAction } from "@/lib/actions";
import { Button } from "../ui/button";

export default function DeleteButton({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteMemoAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "メモの削除に失敗しました",
        });
        return;
      }
      // reget data
      queryClient.invalidateQueries({ queryKey: ["memos"] });
      queryClient.invalidateQueries({ queryKey: ["stat"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      toast({
        description: "メモを削除しました",
      });
    },
  });
  return (
    <Button onClick={() => mutation.mutate(id)} disabled={mutation.isPending}>
      {mutation.isPending ? "削除中" : "削除"}
    </Button>
  );
}
