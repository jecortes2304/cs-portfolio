"use client";

import {DocumentArrowUpIcon, MagnifyingGlassIcon, TrashIcon} from "@heroicons/react/24/outline";
import {useTranslations} from "next-intl";

type Props = {
    search: string;
    onSearchChange: (v: string) => void;
    limit: number;
    onLimitChange: (v: number) => void;
    selectedCount: number;
    onDeleteSelected: () => void;
    onOpenCreate: () => void;
};

export function ProjectsToolbar({
                                    search,
                                    onSearchChange,
                                    limit,
                                    onLimitChange,
                                    selectedCount,
                                    onDeleteSelected,
                                    onOpenCreate,
                                }: Props) {
    const t = useTranslations("AdminPanel.ProjectsPage");

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <div className="flex items-center gap-2">
                    {selectedCount > 0 && (
                        <button className="btn btn-error btn-sm" onClick={onDeleteSelected}>
                            <TrashIcon className="w-4 h-4 mr-1" />
                            {t("actions.deleteSelected")} ({selectedCount})
                        </button>
                    )}
                    <button className="btn btn-primary btn-sm" onClick={onOpenCreate}>
                        <DocumentArrowUpIcon className="w-4 h-4 mr-1" />
                        {t("actions.new")}
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <label className="input w-full max-w-xs">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                    <input
                        type="search"
                        className="grow"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={t("searchPlaceholder") as string}
                    />
                </label>

                <select
                    className="select select-bordered select-sm"
                    value={limit}
                    onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
                >
                    {[5, 10, 20, 50].map((n) => (
                        <option key={n} value={n}>
                            {n} / {t("perPage")}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
