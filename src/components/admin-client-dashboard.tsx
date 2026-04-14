"use client";

import { useMemo, useState } from "react";

type Status =
  | "New"
  | "Awaiting Docs"
  | "In Progress"
  | "Submitted"
  | "Completed";

type ClientRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  taxYear: string;
  dateSubmitted: string;
  status: Status;
  documents: string[];
  notes: string;
};

const MOCK_CLIENTS: ClientRow[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+27 82 000 0001",
    taxYear: "2025",
    dateSubmitted: "2026-04-02",
    status: "New",
    documents: ["ID Document.pdf", "Payslip.jpg"],
    notes: "",
  },
  {
    id: "2",
    name: "Mary Jacobs",
    email: "mary.j@email.com",
    phone: "+27 83 000 0002",
    taxYear: "2024",
    dateSubmitted: "2026-03-28",
    status: "Awaiting Docs",
    documents: ["IRP5.pdf"],
    notes: "Waiting on medical aid certificate.",
  },
  {
    id: "3",
    name: "Thabo Molefe",
    email: "thabo.m@email.com",
    phone: "+27 84 000 0003",
    taxYear: "2025",
    dateSubmitted: "2026-03-15",
    status: "In Progress",
    documents: ["IRP5.pdf", "RA certificate.pdf"],
    notes: "",
  },
  {
    id: "4",
    name: "Sarah van der Berg",
    email: "sarah.vdb@email.com",
    phone: "+27 71 000 0004",
    taxYear: "2025",
    dateSubmitted: "2026-02-10",
    status: "Submitted",
    documents: ["IRP5.pdf", "IT3b.pdf", "Expenses.xlsx"],
    notes: "Filed via eFiling.",
  },
  {
    id: "5",
    name: "David Naidoo",
    email: "david.n@email.com",
    phone: "+27 72 000 0005",
    taxYear: "2024",
    dateSubmitted: "2026-01-22",
    status: "Completed",
    documents: ["IRP5.pdf"],
    notes: "Assessment issued.",
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `demo-${i + 6}`,
    name: `Demo Client ${i + 6}`,
    email: `client${i + 6}@example.com`,
    phone: `+27 60 ${100 + i} 0000`,
    taxYear: i % 2 === 0 ? "2025" : "2024",
    dateSubmitted: "2025-12-01",
    status: (["New", "In Progress", "Completed"] as const)[i % 3],
    documents: ["IRP5.pdf"],
    notes: "",
  })),
];

const PAGE_SIZE = 5;

const ALL_STATUSES: (Status | "All")[] = [
  "All",
  "New",
  "Awaiting Docs",
  "In Progress",
  "Submitted",
  "Completed",
];

function statusPillClass(status: Status) {
  if (status === "New" || status === "Awaiting Docs") {
    return "border border-red-600/50 bg-red-50 text-red-800";
  }
  return "border border-neutral-200 bg-neutral-100 text-neutral-700";
}

export function AdminClientDashboard() {
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [yearFilter, setYearFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(MOCK_CLIENTS[0]?.id ?? "");
  const [detailStatus, setDetailStatus] = useState<Status>(
    MOCK_CLIENTS[0]?.status ?? "New",
  );
  const [noteDraft, setNoteDraft] = useState(MOCK_CLIENTS[0]?.notes ?? "");

  const years = useMemo(() => {
    const set = new Set(MOCK_CLIENTS.map((c) => c.taxYear));
    return ["All", ...[...set].sort().reverse()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_CLIENTS.filter((c) => {
      if (statusFilter !== "All" && c.status !== statusFilter) return false;
      if (yearFilter !== "All" && c.taxYear !== yearFilter) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""))
      );
    });
  }, [query, statusFilter, yearFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  const selected =
    MOCK_CLIENTS.find((c) => c.id === selectedId) ?? filtered[0] ?? null;

  const stats = useMemo(() => {
    return {
      new: MOCK_CLIENTS.filter((c) => c.status === "New").length,
      inProgress: MOCK_CLIENTS.filter((c) => c.status === "In Progress").length,
      completed: MOCK_CLIENTS.filter((c) => c.status === "Completed").length,
    };
  }, []);

  function syncDetailFromRow(row: ClientRow) {
    setSelectedId(row.id);
    setDetailStatus(row.status);
    setNoteDraft(row.notes);
  }

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Client Dashboard
        </h1>
        <p className="mt-1 text-neutral-600">
          Manage all your client submissions in one place.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Status
                </span>
                <select
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as Status | "All");
                    setPage(0);
                  }}
                >
                  {ALL_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s === "All" ? "All Statuses" : s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Tax year
                </span>
                <select
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm"
                  value={yearFilter}
                  onChange={(e) => {
                    setYearFilter(e.target.value);
                    setPage(0);
                  }}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y === "All" ? "All Years" : y}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="relative w-full sm:max-w-xs sm:flex-1 lg:max-w-sm">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="search"
                placeholder="Search name, email, or phone"
                className="w-full rounded-lg border border-neutral-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm placeholder:text-neutral-400"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(0);
                }}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-[#1a1a1a] text-xs font-semibold uppercase tracking-wide text-white">
                  <tr>
                    <th className="px-4 py-3">Client Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Tax Year</th>
                    <th className="px-4 py-3">Date Submitted</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right"> </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {pageRows.map((row, i) => (
                    <tr
                      key={row.id}
                      className={
                        i % 2 === 0 ? "bg-white" : "bg-neutral-50/80"
                      }
                    >
                      <td className="px-4 py-3 font-medium text-neutral-900">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {row.email}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {row.phone}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {row.taxYear}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {row.dateSubmitted}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusPillClass(row.status)}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-50"
                          onClick={() => syncDetailFromRow(row)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-2 border-t border-neutral-100 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {filtered.length === 0 ? 0 : safePage * PAGE_SIZE + 1}{" "}
                to {Math.min((safePage + 1) * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length} clients
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium disabled:opacity-40"
                  disabled={safePage <= 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium disabled:opacity-40"
                  disabled={safePage >= pageCount - 1}
                  onClick={() =>
                    setPage((p) => Math.min(pageCount - 1, p + 1))
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {selected ? (
            <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
              <div className="bg-[#1a1a1a] px-4 py-3 text-sm font-semibold text-white">
                Client Details: {selected.name}
              </div>
              <div className="grid gap-6 p-4 lg:grid-cols-3">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Contact
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                    <li>{selected.email}</li>
                    <li>{selected.phone}</li>
                  </ul>
                  <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Documents uploaded
                  </h3>
                  <ul className="mt-2 list-inside list-disc text-sm text-neutral-700">
                    {selected.documents.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Internal notes
                  </h3>
                  <textarea
                    className="mt-2 min-h-[120px] w-full rounded-lg border border-neutral-300 p-3 text-sm"
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder="Add notes for this client…"
                  />
                  <button
                    type="button"
                    className="mt-2 rounded-lg bg-[#1a1a1a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    onClick={() => {}}
                  >
                    Save note
                  </button>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Status update
                  </h3>
                  <select
                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm"
                    value={detailStatus}
                    onChange={(e) =>
                      setDetailStatus(e.target.value as Status)
                    }
                  >
                    {ALL_STATUSES.filter((s) => s !== "All").map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="mt-3 w-full rounded-lg bg-[#1a1a1a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 sm:w-auto"
                    onClick={() => {}}
                  >
                    Update status
                  </button>
                </div>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="w-full shrink-0 lg:w-72">
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="bg-[#1a1a1a] px-4 py-3 text-sm font-semibold text-white">
              Quick Stats
            </div>
            <ul className="divide-y divide-neutral-100 p-2 text-sm">
              <li className="flex justify-between px-2 py-3">
                <span className="text-neutral-600">New submissions</span>
                <span className="font-semibold text-neutral-900">
                  {stats.new}
                </span>
              </li>
              <li className="flex justify-between px-2 py-3">
                <span className="text-neutral-600">In progress</span>
                <span className="font-semibold text-neutral-900">
                  {stats.inProgress}
                </span>
              </li>
              <li className="flex justify-between px-2 py-3">
                <span className="text-neutral-600">Completed</span>
                <span className="font-semibold text-neutral-900">
                  {stats.completed}
                </span>
              </li>
            </ul>
          </div>
          <p className="mt-4 text-center text-xs text-neutral-500 lg:text-left">
            Preview data only — connect to your database when you go live.
          </p>
        </aside>
      </div>
    </div>
  );
}
