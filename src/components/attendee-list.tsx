import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { IconButton } from "./icon-button";
import Table from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";

import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChangeEvent, useEffect, useState } from "react";

interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  checkedInAt: Date | null;
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / 10);

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);

    setSearch(search);
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));

    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    fetch(url).then((response) =>
      response.json().then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      })
    );
  }, [page, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 ">
        <h1 className="font-bold text-2xl">Participantes</h1>

        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg bg-transparent text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />

          <input
            value={search}
            onChange={onSearchInputChanged}
            placeholder="Buscar participantes..."
            className="bg-transparent w-full flex-1 focus:ring-0 outline-offset-0 outline-none ring-0 h-auto border-0 p-0 text-sm"
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: "48px" }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: "64px" }}></TableHeader>
          </tr>
        </thead>

        <tbody>
          {attendees.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell>
                <input
                  type="checkbox"
                  className="size-4 bg-black/20 rounded border border-white/10 "
                />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    {attendee.name}
                  </span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>
                {formatDistance(new Date(attendee.createdAt), new Date(), {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </TableCell>

              <TableCell>
                {attendee.checkedInAt
                  ? formatDistance(new Date(attendee.checkedInAt), new Date(), {
                      locale: ptBR,
                      addSuffix: true,
                    })
                  : "-"}
              </TableCell>
              <TableCell>
                <IconButton variant="transparent">
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>

        <tfoot>
          <TableCell colSpan={3}>
            Mostrando {attendees.length} itens de {total}
          </TableCell>

          <TableCell className="text-right" colSpan={3}>
            <div className="inline-flex items-center gap-8">
              <span>
                Página {page} de {totalPages}
              </span>

              <div className="flex gap-1.5">
                <IconButton
                  disabled={page === 1}
                  onClick={goToFirstPage}
                  variant="default"
                >
                  <ChevronsLeft className="size-4" />
                </IconButton>

                <IconButton
                  disabled={page === 1}
                  onClick={goToPreviousPage}
                  variant="default"
                >
                  <ChevronLeft className="size-4" />
                </IconButton>

                <IconButton
                  disabled={page === totalPages}
                  onClick={goToNextPage}
                  variant="default"
                >
                  <ChevronRight className="size-4" />
                </IconButton>

                <IconButton
                  disabled={page === totalPages}
                  onClick={goToLastPage}
                  variant="default"
                >
                  <ChevronsRight className="size-4" />
                </IconButton>
              </div>
            </div>
          </TableCell>
        </tfoot>
      </Table>
    </div>
  );
}
