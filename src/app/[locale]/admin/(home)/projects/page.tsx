"use client";

import React, {useEffect, useMemo, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {ProjectSchema, ProjectStatus, ProjectType} from "@/schemas/ProjectSchemas";
import {createProjectAdmin, deleteProjectAdmin, fetchProjectsAdmin, updateProjectAdmin} from "@/lib/request/project";
import {ProjectsToolbar} from "@/components/admin/projects/ProjectsToolbar";
import {ProjectsTable} from "@/components/admin/projects/ProjectsTable";

type SortKey = "name" | "type" | "status" | "id";
type SortOrder = "asc" | "desc";

export default function ProjectsPage() {
    const t = useTranslations("AdminPanel.ProjectsPage");
    const locale = useLocale();

    const [rows, setRows] = useState<ProjectSchema[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortKey, setSortKey] = useState<SortKey>("id");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [viewStackFor, setViewStackFor] = useState<ProjectSchema | null>(null);
    const [viewDescFor, setViewDescFor] = useState<ProjectSchema | null>(null);
    const [editing, setEditing] = useState<ProjectSchema | null>(null);
    const [creating, setCreating] = useState<boolean>(false);

    const [formLogo, setFormLogo] = useState<File | null>(null);
    const [formBanner, setFormBanner] = useState<File | null>(null);
    const [formImages, setFormImages] = useState<File[]>([]);
    const [formData, setFormData] = useState<Partial<ProjectSchema>>({});

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await fetchProjectsAdmin();
                if (mounted) setRows(data);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const filtered = useMemo(() => {
        const needle = search.trim().toLowerCase();
        if (!needle) return rows;
        return rows.filter((p) => p.name.toLowerCase().includes(needle));
    }, [rows, search]);

    const sorted = useMemo(() => {
        return [...filtered].sort((a, b) => {
            const dir = sortOrder === "asc" ? 1 : -1;
            if (sortKey === "name") return a.name.localeCompare(b.name) * dir;
            if (sortKey === "type") return a.type.localeCompare(b.type) * dir;
            if (sortKey === "status") return a.status.localeCompare(b.status) * dir;
            if (sortKey === "id") return (a.id - b.id) * dir;
            return 0;
        });
    }, [filtered, sortKey, sortOrder]);

    // const totalPages = Math.max(1, Math.ceil(sorted.length / limit));
    const pageItems = useMemo(() => {
        const start = (page - 1) * limit;
        return sorted.slice(start, start + limit);
    }, [sorted, page, limit]);

    const toggleAll = (ids: number[]) => {
        setSelectedIds(ids);
    };

    const toggleOne = (id: number) => {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    };

    const setSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const openCreate = () => {
        setFormData({});
        setFormLogo(null);
        setFormBanner(null);
        setFormImages([]);
        setCreating(true);
        (document.getElementById("modalProject") as HTMLDialogElement).showModal();
    };

    const openEdit = (p: ProjectSchema) => {
        setEditing(p);
        setFormData({ ...p });
        setFormLogo(null);
        setFormBanner(null);
        setFormImages([]);
        (document.getElementById("modalProject") as HTMLDialogElement).showModal();
    };

    const closeForm = () => {
        setCreating(false);
        setEditing(null);
        (document.getElementById("modalProject") as HTMLDialogElement).close();
    };

    const addImages = (files: FileList | null) => {
        if (!files) return;
        const list = Array.from(files);
        setFormImages((prev) => [...prev, ...list]);
    };

    const removeImageAt = (idx: number) => {
        setFormImages((prev) => prev.filter((_, i) => i !== idx));
    };

    const onSaveForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const fd = new FormData();
        if (formData.name) fd.append("name", formData.name);
        if (formData.type) fd.append("type", formData.type as ProjectType);
        if (formData.status) fd.append("status", formData.status as ProjectStatus);
        if (formData.repositoryUrl !== undefined) fd.append("repositoryUrl", formData.repositoryUrl || "");
        if (formData.publishUrl !== undefined) fd.append("publishUrl", formData.publishUrl || "");
        if (formData.descriptionEs !== undefined) fd.append("descriptionEs", formData.descriptionEs || "");
        if (formData.descriptionEn !== undefined) fd.append("descriptionEn", formData.descriptionEn || "");
        if (formData.visible !== undefined) fd.append("visible", String(formData.visible));
        const stack = formData.techStack || [];
        fd.append("techStack", JSON.stringify(stack));
        if (formLogo) fd.append("logo", formLogo);
        if (formBanner) fd.append("banner", formBanner);
        for (const img of formImages) fd.append("images", img);

        if (creating) {
            const created = await createProjectAdmin(fd);
            setRows((prev) => [created, ...prev]);
        } else if (editing) {
            const updated = await updateProjectAdmin(editing.id, fd);
            setRows((prev) => prev.map((r) => (r.id === editing.id ? updated : r)));
        }
        closeForm();
    };

    const onDelete = async (id: number) => {
        await deleteProjectAdmin(id);
        setRows((prev) => prev.filter((r) => r.id !== id));
        setSelectedIds((prev) => prev.filter((i) => i !== id));
    };

    const onDeleteSelected = async () => {
        for (const id of selectedIds) {
            await deleteProjectAdmin(id);
        }
        setRows((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
        setSelectedIds([]);
    };

    // const typeLabel = (type: ProjectType) => t(`types.${type}`);
    // const statusLabel = (st: ProjectStatus) => t(`status.${st}`);
    const descByLocale = (p: ProjectSchema) => (locale.startsWith("es") ? p.descriptionEs : p.descriptionEn);

    return (
        <div className="space-y-4">
            <ProjectsToolbar
                search={search}
                onSearchChange={(v) => {
                    setSearch(v);
                    setPage(1);
                }}
                limit={limit}
                onLimitChange={(v) => {
                    setLimit(v);
                    setPage(1);
                }}
                selectedCount={selectedIds.length}
                onDeleteSelected={onDeleteSelected}
                onOpenCreate={openCreate}
            />

            {loading ? (
                <div className="py-16 text-center text-sm text-gray-400">Loading...</div>
            ) : (
                <ProjectsTable
                    rows={pageItems}
                    page={page}
                    limit={limit}
                    sortKey={sortKey}
                    sortOrder={sortOrder}
                    selectedIds={selectedIds}
                    onToggleOneAction={toggleOne}
                    onToggleAllAction={toggleAll}
                    onSortChangeAction={setSort}
                    onEditAction={openEdit}
                    onDeleteAction={onDelete}
                    onViewStackAction={(p) => setViewStackFor(p)}
                    onViewDescAction={(p) => setViewDescFor(p)}
                />
            )}

            <dialog id="modalProject" className="modal">
                <div className="modal-box max-w-3xl">
                    <h3 className="font-bold text-lg">{creating ? t("modal.createTitle") : t("modal.editTitle")}</h3>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" onSubmit={onSaveForm}>
                        <input
                            className="input input-bordered w-full"
                            placeholder={t("form.name") as string}
                            value={formData.name ?? ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        />

                        <select
                            className="select select-bordered w-full"
                            value={formData.type ?? "web"}
                            onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as ProjectType }))}
                        >
                            {["web", "mobile", "desktop", "game", "cli", "other"].map((x) => (
                                <option key={x} value={x}>
                                    {t(`types.${x as ProjectType}`)}
                                </option>
                            ))}
                        </select>

                        <select
                            className="select select-bordered w-full"
                            value={formData.status ?? "pending"}
                            onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as ProjectStatus }))}
                        >
                            {["finished", "inProgress", "pending", "discontinued"].map((x) => (
                                <option key={x} value={x}>
                                    {t(`status.${x as ProjectStatus}`)}
                                </option>
                            ))}
                        </select>

                        <label className="label">
                            <span className="label-text">{t("form.visible")}</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={formData.visible ?? true}
                                onChange={(e) => setFormData((prev) => ({ ...prev, visible: e.target.checked }))}
                            />
                        </label>

                        <input
                            className="input input-bordered w-full md:col-span-2"
                            placeholder={t("form.repositoryUrl") as string}
                            value={formData.repositoryUrl ?? ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, repositoryUrl: e.target.value }))}
                        />

                        <input
                            className="input input-bordered w-full md:col-span-2"
                            placeholder={t("form.publishUrl") as string}
                            value={formData.publishUrl ?? ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, publishUrl: e.target.value }))}
                        />

                        <textarea
                            className="textarea textarea-bordered md:col-span-2"
                            rows={3}
                            placeholder={t("form.descriptionEs") as string}
                            value={formData.descriptionEs ?? ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, descriptionEs: e.target.value }))}
                        />

                        <textarea
                            className="textarea textarea-bordered md:col-span-2"
                            rows={3}
                            placeholder={t("form.descriptionEn") as string}
                            value={formData.descriptionEn ?? ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, descriptionEn: e.target.value }))}
                        />

                        <input
                            className="input input-bordered w-full md:col-span-2"
                            placeholder="Stack (comma separated)"
                            value={(formData.techStack || []).join(", ")}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    techStack: e.target.value
                                        .split(",")
                                        .map((s) => s.trim())
                                        .filter(Boolean),
                                }))
                            }
                        />

                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="card bg-base-200 p-4">
                                <span className="font-medium mb-2">{t("form.logo")}</span>
                                <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setFormLogo(e.target.files?.[0] ?? null)} />
                                {formLogo && <span className="text-xs mt-2">{formLogo.name}</span>}
                            </div>

                            <div className="card bg-base-200 p-4">
                                <span className="font-medium mb-2">{t("form.banner")}</span>
                                <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setFormBanner(e.target.files?.[0] ?? null)} />
                                {formBanner && <span className="text-xs mt-2">{formBanner.name}</span>}
                            </div>

                            <div className="card bg-base-200 p-4">
                                <span className="font-medium mb-2">{t("form.images")}</span>
                                <input type="file" accept="image/*" multiple className="file-input file-input-bordered w-full" onChange={(e) => addImages(e.target.files)} />
                                {formImages.length > 0 && (
                                    <div className="mt-2 max-h-32 overflow-auto space-y-1">
                                        {formImages.map((f, i) => (
                                            <div key={`${f.name}-${i}`} className="flex items-center justify-between text-xs bg-base-100 p-2 rounded">
                                                <span className="truncate">{f.name}</span>
                                                <button type="button" className="btn btn-ghost btn-xs text-error" onClick={() => removeImageAt(i)}>
                                                    {t("form.remove")}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-action md:col-span-2">
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

            <dialog className="modal" open={!!viewStackFor} onClose={() => setViewStackFor(null)}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        {t("stackModal.title")}: {viewStackFor?.name}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {(viewStackFor?.techStack ?? []).map((tech) => (
                            <span key={tech} className="badge badge-outline">
                {tech}
              </span>
                        ))}
                    </div>
                    <div className="modal-action">
                        <button className="btn" onClick={() => setViewStackFor(null)}>
                            {t("actions.close")}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop" onClick={() => setViewStackFor(null)}>
                    <button>close</button>
                </form>
            </dialog>

            <dialog className="modal" open={!!viewDescFor} onClose={() => setViewDescFor(null)}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        {t("descriptionModal.title")}: {viewDescFor?.name}
                    </h3>
                    <p className="mt-3 whitespace-pre-wrap text-sm">{viewDescFor ? descByLocale(viewDescFor) : ""}</p>
                    <div className="modal-action">
                        <button className="btn" onClick={() => setViewDescFor(null)}>
                            {t("actions.close")}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop" onClick={() => setViewDescFor(null)}>
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
