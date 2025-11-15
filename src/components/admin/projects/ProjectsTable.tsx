"use client";

import {ProjectSchema, ProjectStatus, ProjectType} from "@/schemas/ProjectSchemas";
import {
    CheckCircleIcon,
    CodeBracketIcon,
    CommandLineIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    DocumentChartBarIcon,
    EyeIcon,
    EyeSlashIcon,
    GlobeAltIcon,
    PencilSquareIcon,
    PhotoIcon,
    Square2StackIcon,
    TrashIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import {ClockIcon, RocketLaunchIcon} from "@heroicons/react/16/solid";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {useMemo} from "react";

type SortKey = "name" | "type" | "status" | "id";
type SortOrder = "asc" | "desc";

type Props = {
    limit: number;
    onDeleteAction: (id: number) => void;
    onEditAction: (p: ProjectSchema) => void;
    onSortChangeAction: (k: SortKey) => void;
    onToggleAllAction: (ids: number[]) => void;
    onToggleOneAction: (id: number) => void;
    onViewDescAction: (p: ProjectSchema) => void;
    onViewStackAction: (p: ProjectSchema) => void;
    page: number;
    rows: ProjectSchema[];
    selectedIds: number[];
    sortKey: SortKey;
    sortOrder: SortOrder;
};

const typeIconMap: Record<ProjectType, JSX.Element> = {
    desktop: <ComputerDesktopIcon className="w-5 h-5" />,
    mobile: <DevicePhoneMobileIcon className="w-5 h-5" />,
    web: <GlobeAltIcon className="w-5 h-5" />,
    game: <Square2StackIcon className="w-5 h-5" />,
    cli: <CommandLineIcon className="w-5 h-5" />,
    other: <DocumentChartBarIcon className="w-5 h-5" />,
};

const statusIconMap: Record<ProjectStatus, JSX.Element> = {
    finished: <CheckCircleIcon className="w-5 h-5 text-success" />,
    inProgress: <RocketLaunchIcon className="w-5 h-5 text-primary" />,
    pending: <ClockIcon className="w-5 h-5 text-info" />,
    discontinued: <XCircleIcon className="w-5 h-5 text-error" />,
};

export function ProjectsTable({
                                  rows,
                                  page,
                                  limit,
                                  sortKey,
                                  sortOrder,
                                  selectedIds,
                                  onToggleOneAction,
                                  onToggleAllAction,
                                  onSortChangeAction,
                                  onEditAction,
                                  onDeleteAction,
                                  onViewStackAction,
                                  onViewDescAction,
                              }: Props) {
    const t = useTranslations("AdminPanel.ProjectsPage");
    const sorted = useMemo(() => {
        const dir = sortOrder === "asc" ? 1 : -1;
        return [...rows].sort((a, b) => {
            if (sortKey === "name") return a.name.localeCompare(b.name) * dir;
            if (sortKey === "type") return a.type.localeCompare(b.type) * dir;
            if (sortKey === "status") return a.status.localeCompare(b.status) * dir;
            if (sortKey === "id") return (a.id - b.id) * dir;
            return 0;
        });
    }, [rows, sortKey, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / limit));
    const pageItems = useMemo(() => {
        const start = (page - 1) * limit;
        return sorted.slice(start, start + limit);
    }, [sorted, page, limit]);

    const allSelected =
        pageItems.length > 0 &&
        pageItems.every((p) => selectedIds.includes(p.id));

    const typeLabel = (type: ProjectType) => t(`types.${type}`);
    const statusLabel = (st: ProjectStatus) => t(`status.${st}`);

    const handleToggleAll = (checked: boolean) => {
        if (checked) {
            onToggleAllAction(pageItems.map((p) => p.id));
        } else {
            onToggleAllAction([]);
        }
    };

    return (
        <>
            <div className="overflow-x-auto glassy p-2 rounded-xl">
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={allSelected}
                                onChange={(e) => handleToggleAll(e.target.checked)}
                            />
                        </th>
                        <th onClick={() => onSortChangeAction("id")} className="cursor-pointer">
                            {t("columns.id")}{" "}
                            {sortKey === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th>{t("columns.logo")}</th>
                        <th
                            onClick={() => onSortChangeAction("name")}
                            className="cursor-pointer"
                        >
                            {t("columns.name")}{" "}
                            {sortKey === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th
                            onClick={() => onSortChangeAction("type")}
                            className="cursor-pointer"
                        >
                            {t("columns.type")}{" "}
                            {sortKey === "type" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th>{t("columns.repo")}</th>
                        <th>{t("columns.publish")}</th>
                        <th
                            onClick={() => onSortChangeAction("status")}
                            className="cursor-pointer"
                        >
                            {t("columns.status")}{" "}
                            {sortKey === "status"
                                ? sortOrder === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th>{t("columns.stack")}</th>
                        <th>{t("columns.visible")}</th>
                        <th>{t("columns.description")}</th>
                        <th>{t("columns.actions")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pageItems.map((p, idx) => (
                        <tr key={p.id} className={idx % 2 === 0 ? "bg-base-200" : ""}>
                            <td>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={selectedIds.includes(p.id)}
                                    onChange={() => onToggleOneAction(p.id)}
                                />
                            </td>
                            <td className="whitespace-nowrap">{p.id}</td>
                            <td>
                                <div className="avatar">
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        {p.logoPath ? (
                                            <Image
                                                src={p.logoPath}
                                                alt={p.name}
                                                width={40}
                                                height={40}
                                            />
                                        ) : (
                                            <PhotoIcon className="w-10 h-10 text-gray-500 p-1" />
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td className="font-medium">{p.name}</td>
                            <td title={typeLabel(p.type)} className="tooltip">
                                <div className="flex items-center gap-2">
                                    {typeIconMap[p.type]}
                                </div>
                            </td>
                            <td>
                                {p.repositoryUrl ? (
                                    <a
                                        className="link link-primary inline-flex items-center gap-1"
                                        href={p.repositoryUrl}
                                        target="_blank"
                                    >
                                        <CodeBracketIcon className="w-5 h-5" />
                                    </a>
                                ) : (
                                    <span className="text-gray-500">—</span>
                                )}
                            </td>
                            <td>
                                {p.publishUrl ? (
                                    <a
                                        className="link link-primary inline-flex items-center gap-1"
                                        href={p.publishUrl}
                                        target="_blank"
                                    >
                                        <GlobeAltIcon className="w-5 h-5" />
                                    </a>
                                ) : (
                                    <span className="text-gray-500">—</span>
                                )}
                            </td>
                            <td title={statusLabel(p.status)} className="tooltip">
                                <div className="flex items-center gap-2">
                                    {statusIconMap[p.status]}
                                </div>
                            </td>
                            <td>
                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => onViewStackAction(p)}
                                >
                                    <CodeBracketIcon className="w-5 h-5" />
                                </button>
                            </td>
                            <td>
                                {p.visible ? (
                                    <EyeIcon className="w-5 h-5 text-success" />
                                ) : (
                                    <EyeSlashIcon className="w-5 h-5 text-warning" />
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => onViewDescAction(p)}
                                >
                                    <DocumentChartBarIcon className="w-5 h-5" />
                                </button>
                            </td>
                            <td className="whitespace-nowrap">
                                <button
                                    className="btn btn-sm btn-outline btn-info mr-2"
                                    onClick={() => onEditAction(p)}
                                >
                                    <PencilSquareIcon className="w-4 h-4" />
                                </button>
                                <button
                                    className="btn btn-sm btn-outline btn-error"
                                    onClick={() => onDeleteAction(p.id)}
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {pageItems.length === 0 && (
                        <tr>
                            <td colSpan={12}>
                                <div className="py-16 text-center text-sm text-gray-400">
                                    {t("empty")}
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-gray-400">
                    {t("pagination.showing")}{" "}
                    {(page - 1) * limit + 1}–
                    {Math.min(page * limit, sorted.length)} {t("pagination.of")}{" "}
                    {sorted.length}
                </div>
                <div className="join">
                    <button
                        className="btn btn-sm join-item"
                        disabled={page <= 1}
                        onClick={() => {
                            if (page > 1) history.replaceState(null, "", "");
                        }}
                    >
                        {t("pagination.prev")}
                    </button>
                    <button
                        className="btn btn-sm join-item"
                        disabled={page >= totalPages}
                    >
                        {t("pagination.next")}
                    </button>
                </div>
            </div>
        </>
    );
}
