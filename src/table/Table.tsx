import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { Box, Button, Paper, Stack } from "@mui/material";
import { MessageType } from "../types";

type DocumentType = {
  id: string;
  status: string; // {‘active’, ‘archive’}
  sum: number;
  qty: number;
  volume: number;
  name: string;
  delivery_date: string;
  currency: string;
};

const columns: GridColDef<DocumentType>[] = [
  { field: "status", headerName: "Статус", width: 80 },
  { field: "sum", headerName: "Сумма", type: "number", width: 70 },
  { field: "qty", headerName: "Количество", type: "number", width: 100 },
  { field: "volume", headerName: "Объем", type: "number", width: 80 },
  { field: "name", headerName: "Название", width: 130 },
  { field: "delivery_date", headerName: "Дата поставки", width: 130 },
  { field: "currency", headerName: "Валюта", width: 80 },
  {
    field: "all",
    headerName: "Всего",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.sum * params.row.qty} ${params.row.currency}`,
  },
];

export const Table = ({
  addMessage,
}: {
  addMessage: (message: MessageType) => void;
}) => {
  const [staff, setStaff] = useState<DocumentType[]>([]);
  const [summary, setSummary] = useState({ volume: 0, qty: 0 });
  const [selectedIds, setSelectedIds] = useState<GridSelectionModel>([]);
  useEffect(() => {
    Promise.all([
      fetch("/documents1").then((r) => r.json()),
      fetch("/documents2").then((r) => r.json()),
    ]).then((r: DocumentType[][]) =>
      setStaff(
        r
          .flat()
          .sort(
            ({ delivery_date: d1 }, { delivery_date: d2 }) =>
              new Date(d1).getTime() - new Date(d2).getTime()
          )
      )
    );
  }, []);
  useEffect(() => {
    if (!staff?.length) return;
    const summ = staff.reduce(
      (a, b) => ({
        ...a,
        volume: a.volume + b.volume,
        qty: a.qty + b.qty,
      }),
      { volume: 0, qty: 0 }
    );
    setSummary(summ);
  }, [staff]);

  const onSelectionChange = (selectionIds: GridSelectionModel) => {
    setSelectedIds(selectionIds);
  };
  const annulateHandler = () => {
    if (!selectedIds.length) return;
    const annulateString = staff
      .filter(({ id }) => selectedIds.includes(id))
      .map(({ name }) => name)
      .join(", ");
    addMessage({
      title: `Вы уверены что хотите аннулировать товар(ы): ${annulateString}?`,
      accept: () => {
        fetch("/cancel", {
          method: "POST",
          body: JSON.stringify({ ids: selectedIds }),
        });
        setStaff(staff.filter(({ id }) => !selectedIds.includes(id)));
        setSelectedIds([]);
      },
      dismiss: () => {},
    });
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={staff}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={onSelectionChange}
      />
      <Stack direction="row" spacing={2}>
        <Button disabled>Общий обьем: {summary.volume}</Button>
        <Button disabled>Общее количество: {summary.qty}</Button>
        <Button variant="contained" onClick={annulateHandler}>
          Аннулировать
        </Button>
      </Stack>
    </div>
  );
};
