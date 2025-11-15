"use client";

import React, {useMemo} from "react";
import {useTranslations} from "next-intl";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip as RTooltip,
    XAxis,
    YAxis,
} from "recharts";
import ProjectsDataMock from "@/data/Projects";
import SkillsDataMock from "@/data/Skills";
import type {ProjectSchema} from "@/schemas/ProjectSchemas";
import type {SkillSchema} from "@/schemas/SkillSchemas";

// Simple color palette
const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"];

export default function DashboardPage() {
    const t = useTranslations("AdminPanel.DashboardPage");

    const projects = ProjectsDataMock as ProjectSchema[];
    const skills = SkillsDataMock as SkillSchema[];

    // KPIs
    const totalProjects = projects.length;
    const visibleProjects = projects.filter(p => p.visible).length;
    const byStatus = useMemo(() => {
        const map: Record<string, number> = {};
        for (const p of projects) map[p.status] = (map[p.status] || 0) + 1;
        return Object.entries(map).map(([status, value]) => ({ status, value }));
    }, [projects]);

    const avgSkill = useMemo(() => {
        if (!skills.length) return 0;
        return Math.round(skills.reduce((acc, s) => acc + s.percent, 0) / skills.length);
    }, [skills]);

    // Charts data
    const pieData = byStatus.map(({ status, value }) => ({
        name: t(`status.${status}` as any),
        value,
    }));

    const topSkills = useMemo(() => {
        const sorted = [...skills].sort((a, b) => b.percent - a.percent).slice(0, 10);
        return sorted.map(s => ({ name: s.name, percent: s.percent }));
    }, [skills]);

    // Mock emails per day (replace with real data later)
    const emailSeries = useMemo(() => {
        // last 7 days mock
        const today = new Date();
        const out: { day: string; total: number }[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const label = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
            const total = 2 + Math.floor(Math.random() * 6);
            out.push({ day: label, total });
        }
        return out;
    }, []);

    const recentProjects = useMemo(
        () => [...projects].sort((a, b) => b.id - a.id).slice(0, 5),
        [projects]
    );

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">{t("title")}</h1>

            {/* KPI cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card bg-base-200">
                    <div className="card-body">
                        <p className="text-sm text-gray-400">{t("kpi.totalProjects")}</p>
                        <p className="text-3xl font-bold">{totalProjects}</p>
                    </div>
                </div>
                <div className="card bg-base-200">
                    <div className="card-body">
                        <p className="text-sm text-gray-400">{t("kpi.visibleProjects")}</p>
                        <p className="text-3xl font-bold">{visibleProjects}</p>
                    </div>
                </div>
                <div className="card bg-base-200">
                    <div className="card-body">
                        <p className="text-sm text-gray-400">{t("kpi.avgSkill")}</p>
                        <p className="text-3xl font-bold">{avgSkill}%</p>
                    </div>
                </div>
                <div className="card bg-base-200">
                    <div className="card-body">
                        <p className="text-sm text-gray-400">{t("kpi.statusKinds")}</p>
                        <p className="text-3xl font-bold">{byStatus.length}</p>
                    </div>
                </div>
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Pie: projects by status */}
                <div className="card bg-base-200">
                    <div className="card-body gap-2">
                        <h2 className="card-title">{t("charts.projectsByStatus")}</h2>
                        <div className="w-full h-64">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                                        {pieData.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RTooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                            {pieData.map((d, i) => (
                                <div key={i} className="inline-flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                                    <span>{d.name}: {d.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bar: top skills */}
                <div className="card bg-base-200 xl:col-span-2">
                    <div className="card-body gap-2">
                        <h2 className="card-title">{t("charts.topSkills")}</h2>
                        <div className="w-full h-64">
                            <ResponsiveContainer>
                                <BarChart data={topSkills} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <RTooltip />
                                    <Bar dataKey="percent" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emails per day (mock) */}
            <div className="card bg-base-200">
                <div className="card-body gap-2">
                    <h2 className="card-title">{t("charts.emailsPerDay")}</h2>
                    <div className="w-full h-64">
                        <ResponsiveContainer>
                            <AreaChart data={emailSeries} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <RTooltip />
                                <Area type="monotone" dataKey="total" stroke="#3B82F6" fillOpacity={1} fill="url(#colorA)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent projects */}
            <div className="card bg-base-200">
                <div className="card-body">
                    <h2 className="card-title">{t("recent.title")}</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>{t("recent.columns.id")}</th>
                                <th>{t("recent.columns.name")}</th>
                                <th>{t("recent.columns.type")}</th>
                                <th>{t("recent.columns.status")}</th>
                                <th>{t("recent.columns.visible")}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recentProjects.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td className="font-medium">{p.name}</td>
                                    <td>{t(`types.${p.type}` as any)}</td>
                                    <td>{t(`status.${p.status}` as any)}</td>
                                    <td>{p.visible ? t("recent.visible.yes") : t("recent.visible.no")}</td>
                                </tr>
                            ))}
                            {recentProjects.length === 0 && (
                                <tr><td colSpan={5} className="text-center text-sm text-gray-400 py-8">{t("recent.empty")}</td></tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}
