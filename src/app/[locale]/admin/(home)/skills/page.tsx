"use client";

import React, {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {EyeIcon, EyeSlashIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon,} from "@heroicons/react/24/outline";
import type {SkillSchema} from "@/schemas/SkillSchemas";
import SkillsDataMock from "@/data/Skills";

type SortKey = "id" | "name" | "percent";
type SortOrder = "asc" | "desc";

export default function SkillsPage() {
    const t = useTranslations("AdminPanel.SkillsPage");

    const [rows, setRows] = useState<SkillSchema[]>(SkillsDataMock);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortKey, setSortKey] = useState<SortKey>("id");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [editing, setEditing] = useState<SkillSchema | null>(null);
    const [creating, setCreating] = useState<boolean>(false);

    const [formData, setFormData] = useState<Partial<SkillSchema>>({});

    // Filter
    const filtered = useMemo(() => {
        const needle = search.trim().toLowerCase();
        if (!needle) return rows;
        return rows.filter((s) => s.name.toLowerCase().includes(needle));
    }, [rows, search]);

    // Sort
    const sorted = useMemo(() => {
        const res = [...filtered].sort((a, b) => {
            const dir = sortOrder === "asc" ? 1 : -1;
            if (sortKey === "id") return (a.id - b.id) * dir;
            if (sortKey === "name") return a.name.localeCompare(b.name) * dir;
            if (sortKey === "percent") return (a.percent - b.percent) * dir;
            return 0;
        });
        return res;
    }, [filtered, sortKey, sortOrder]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(sorted.length / limit));
    const pageItems = useMemo(() => {
        const start = (page - 1) * limit;
        return sorted.slice(start, start + limit);
    }, [sorted, page, limit]);

    const toggleAll = (checked: boolean) => {
        if (checked) setSelectedIds(pageItems.map((s) => s.id));
        else setSelectedIds([]);
    };

    const toggleOne = (id: number) => {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    };

    const setSort = (key: SortKey) => {
        if (sortKey === key) setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
        else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const openCreate = () => {
        setFormData({ name: "", percent: 0, visible: true });
        setCreating(true);
        (document.getElementById("modalSkill") as HTMLDialogElement).showModal();
    };

    const openEdit = (s: SkillSchema) => {
        setEditing(s);
        setFormData({ ...s });
        (document.getElementById("modalSkill") as HTMLDialogElement).showModal();
    };

    const closeForm = () => {
        setCreating(false);
        setEditing(null);
        (document.getElementById("modalSkill") as HTMLDialogElement).close();
    };

    const onSaveForm = (e: React.FormEvent) => {
        e.preventDefault();
        const name = (formData.name ?? "").trim();
        const percent = Number(formData.percent ?? 0);
        const visible = Boolean(formData.visible ?? true);

        if (!name || Number.isNaN(percent)) {
            return;
        }

        if (creating) {
            const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
            const newRow: SkillSchema = { id: nextId, name, percent, visible };
            setRows((prev) => [newRow, ...prev]);
        } else if (editing) {
            setRows((prev) => prev.map((r) => (r.id === editing.id ? { id: editing.id, name, percent, visible } : r)));
        }

        closeForm();
    };

    const onDelete = (id: number) => {
        setRows((prev) => prev.filter((r) => r.id !== id));
        setSelectedIds((prev) => prev.filter((i) => i !== id));
    };

    const onDeleteSelected = () => {
        setRows((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
        setSelectedIds([]);
    };

    return (
        <div className="space-y-4">
            {/* Header actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <div className="flex items-center gap-2">
                    {selectedIds.length > 0 && (
                        <button className="btn btn-error btn-sm" onClick={onDeleteSelected}>
                            <TrashIcon className="w-4 h-4 mr-1" />
                            {t("actions.deleteSelected")} ({selectedIds.length})
                        </button>
                    )}
                    <button className="btn btn-primary btn-sm" onClick={openCreate}>
                        {t("actions.new")}
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
                <label className="input w-full max-w-xs">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                    <input
                        type="search"
                        className="grow"
                        placeholder={t("searchPlaceholder") as string}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </label>

                <select
                    className="select select-bordered select-sm"
                    value={limit}
                    onChange={(e) => {
                        setLimit(parseInt(e.target.value, 10));
                        setPage(1);
                    }}
                >
                    {[5, 10, 20, 50].map((n) => (
                        <option key={n} value={n}>
                            {n} / {t("perPage")}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto glassy p-2 rounded-xl">
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={pageItems.length > 0 && pageItems.every((s) => selectedIds.includes(s.id))}
                                onChange={(e) => toggleAll(e.target.checked)}
                            />
                        </th>
                        <th onClick={() => setSort("id")} className="cursor-pointer">
                            {t("columns.id")} {sortKey === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th onClick={() => setSort("name")} className="cursor-pointer">
                            {t("columns.name")} {sortKey === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th onClick={() => setSort("percent")} className="cursor-pointer">
                            {t("columns.percent")} {sortKey === "percent" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th>{t("columns.visible")}</th>
                        <th>{t("columns.actions")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pageItems.map((s, idx) => (
                        <tr key={s.id} className={idx % 2 === 0 ? "bg-base-200" : ""}>
                            <td>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={selectedIds.includes(s.id)}
                                    onChange={() => toggleOne(s.id)}
                                />
                            </td>
                            <td className="whitespace-nowrap">{s.id}</td>
                            <td className="font-medium">{s.name}</td>
                            <td className="whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <span className="badge badge-outline">{s.percent}%</span>
                                    <progress className="progress progress-primary w-48" value={s.percent} max={100} />
                                </div>
                            </td>
                            <td>
                                {s.visible ? (
                                    <EyeIcon className="w-5 h-5 text-success" />
                                ) : (
                                    <EyeSlashIcon className="w-5 h-5 text-warning" />
                                )}
                            </td>
                            <td className="whitespace-nowrap">
                                <button className="btn btn-sm btn-outline btn-info mr-2" onClick={() => openEdit(s)}>
                                    <PencilSquareIcon className="h-4 w-4" />
                                </button>
                                <button className="btn btn-sm btn-outline btn-error" onClick={() => onDelete(s.id)}>
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {pageItems.length === 0 && (
                        <tr>
                            <td colSpan={6}>
                                <div className="py-16 text-center text-sm text-gray-400">{t("empty")}</div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-gray-400">
                    {t("pagination.showing")} {(page - 1) * limit + 1}–{Math.min(page * limit, sorted.length)} {t("pagination.of")} {sorted.length}
                </div>
                <div className="join">
                    <button className="btn btn-sm join-item" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                        {t("pagination.prev")}
                    </button>
                    <button className="btn btn-sm join-item" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                        {t("pagination.next")}
                    </button>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <dialog id="modalSkill" className="modal">
                <div className="modal-box max-w-xl">
                    <h3 className="font-bold text-lg">{creating ? t("modal.createTitle") : t("modal.editTitle")}</h3>

                    <form className="grid grid-cols-1 gap-4 mt-4" onSubmit={onSaveForm}>
                        <input
                            className="input input-bordered w-full"
                            placeholder={t("form.name") as string}
                            value={formData.name ?? ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        />

                        <label className="flex items-center justify-between gap-3">
                            <span className="label-text">{t("form.percent")}</span>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                className="input input-bordered w-28 text-right"
                                value={formData.percent ?? 0}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, percent: Math.max(0, Math.min(100, Number(e.target.value) || 0)) }))
                                }
                            />
                        </label>

                        <input
                            type="range"
                            min={0}
                            max={100}
                            className="range range-primary"
                            value={formData.percent ?? 0}
                            onChange={(e) => setFormData((prev) => ({ ...prev, percent: Number(e.target.value) }))}
                        />

                        <label className="label cursor-pointer justify-between">
                            <span className="label-text">{t("form.visible")}</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={formData.visible ?? true}
                                onChange={(e) => setFormData((prev) => ({ ...prev, visible: e.target.checked }))}
                            />
                        </label>

                        <div className="modal-action">
                            <button type="button" className="btn" onClick={closeForm}>
                                {t("actions.cancel")}
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {t("actions.save")}
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop" onClick={closeForm}>
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
