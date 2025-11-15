"use client";

import React, {useMemo, useState} from "react";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {ArrowUpOnSquareIcon, CheckCircleIcon, PlusIcon, TrashIcon,} from "@heroicons/react/24/outline";

// Simple local type for the profile form
type SocialPlatform =
    | "instagram"
    | "twitter"
    | "linkedin"
    | "github"
    | "youtube"
    | "reddit"
    | "facebook"
    | "tiktok"
    | "other";

type SocialLink = {
    id: string;
    platform: SocialPlatform;
    label?: string;
    url: string;
};

type ProfileForm = {
    cvUrlEn: string;
    cvUrlEs: string;
    intro: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    avatarPath: string;
    heroPath?: string;
    socials: SocialLink[];
};

// Mock initial data for the form
const initialProfile: ProfileForm = {
    cvUrlEn: "",
    cvUrlEs: "",
    intro: "",
    firstName: "José Ernesto",
    lastName: "Cortes",
    email: "jecortes2304@gmail.com",
    phone: "+34 643 52 1716",
    address: "Calle Barlovento #5, Madrid",
    avatarPath: "/images/portfolio-foto.webp",
    heroPath: "/images/home-bg.webp",
    socials: [
        { id: "1", platform: "linkedin", url: "https://www.linkedin.com/in/jecortes", label: "LinkedIn" },
        { id: "2", platform: "github", url: "https://github.com/jecortes2304", label: "GitHub" },
        { id: "3", platform: "instagram", url: "https://instagram.com/cortestudios", label: "Instagram" },
    ],
};

const platformOptions: { value: SocialPlatform; key: SocialPlatform }[] = [
    { value: "instagram", key: "instagram" },
    { value: "twitter", key: "twitter" },
    { value: "linkedin", key: "linkedin" },
    { value: "github", key: "github" },
    { value: "youtube", key: "youtube" },
    { value: "reddit", key: "reddit" },
    { value: "facebook", key: "facebook" },
    { value: "tiktok", key: "tiktok" },
    { value: "other", key: "other" },
];

export default function ProfilePage() {
    const t = useTranslations("AdminPanel.ProfilePage");

    const [form, setForm] = useState<ProfileForm>(initialProfile);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [heroFile, setHeroFile] = useState<File | null>(null);
    const [toastOk, setToastOk] = useState(false);

    const avatarPreview = useMemo(() => {
        if (avatarFile) return URL.createObjectURL(avatarFile);
        return form.avatarPath || "/logo.webp";
    }, [avatarFile, form.avatarPath]);

    const heroPreview = useMemo(() => {
        if (heroFile) return URL.createObjectURL(heroFile);
        return form.heroPath || "/images/banners/default_banner.webp";
    }, [heroFile, form.heroPath]);

    const onSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can integrate with your API later
        setToastOk(true);
        setTimeout(() => setToastOk(false), 2000);
    };

    const addSocial = () => {
        const id = crypto.randomUUID();
        setForm((prev) => ({
            ...prev,
            socials: [...prev.socials, { id, platform: "other", url: "", label: "" }],
        }));
    };

    const updateSocial = (id: string, patch: Partial<SocialLink>) => {
        setForm((prev) => ({
            ...prev,
            socials: prev.socials.map((s) => (s.id === id ? { ...s, ...patch } : s)),
        }));
    };

    const removeSocial = (id: string) => {
        setForm((prev) => ({ ...prev, socials: prev.socials.filter((s) => s.id !== id) }));
    };

    return (
        <form className="space-y-6" onSubmit={onSave}>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <button className="btn btn-primary btn-sm" type="submit">
                    <ArrowUpOnSquareIcon className="w-4 h-4 mr-1" />
                    {t("actions.save")}
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left column */}
                <div className="space-y-6">
                    {/* CV URLs */}
                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body space-y-4">
                            <h2 className="card-title">{t("sections.cv.title")}</h2>
                            <input
                                className="input input-bordered w-full"
                                placeholder={t("sections.cv.cvUrlEn") as string}
                                value={form.cvUrlEn}
                                onChange={(e) => setForm((p) => ({ ...p, cvUrlEn: e.target.value }))}
                            />
                            <input
                                className="input input-bordered w-full"
                                placeholder={t("sections.cv.cvUrlEs") as string}
                                value={form.cvUrlEs}
                                onChange={(e) => setForm((p) => ({ ...p, cvUrlEs: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* About / Intro */}
                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body space-y-4">
                            <h2 className="card-title">{t("sections.about.title")}</h2>
                            <textarea
                                className="textarea textarea-bordered min-h-[140px]"
                                placeholder={t("sections.about.placeholder") as string}
                                value={form.intro}
                                onChange={(e) => setForm((p) => ({ ...p, intro: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Avatar / Portfolio photo */}
                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body space-y-4">
                            <h2 className="card-title">{t("sections.avatar.title")}</h2>
                            <div className="flex items-center gap-4">
                                <div className="avatar">
                                    <div className="w-20 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                        <Image src={avatarPreview} alt="avatar" width={96} height={96} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="file-input file-input-bordered w-full"
                                        onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                                    />
                                    <input
                                        className="input input-bordered w-full mt-2"
                                        placeholder={t("sections.avatar.pathPlaceholder") as string}
                                        value={form.avatarPath}
                                        onChange={(e) => setForm((p) => ({ ...p, avatarPath: e.target.value }))}
                                    />
                                    <p className="text-xs text-gray-400 mt-1">{t("sections.avatar.help")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle column */}
                <div className="space-y-6">
                    {/* Contact info */}
                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body space-y-4">
                            <h2 className="card-title">{t("sections.contact.title")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    className="input input-bordered w-full"
                                    placeholder={t("sections.contact.firstName") as string}
                                    value={form.firstName}
                                    onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    placeholder={t("sections.contact.lastName") as string}
                                    value={form.lastName}
                                    onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    placeholder={t("sections.contact.email") as string}
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    placeholder={t("sections.contact.phone") as string}
                                    value={form.phone}
                                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                                />
                                <input
                                    className="input input-bordered w-full md:col-span-2"
                                    placeholder={t("sections.contact.address") as string}
                                    value={form.address}
                                    onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social links */}
                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="card-title">{t("sections.socials.title")}</h2>
                                <button type="button" className="btn btn-sm" onClick={addSocial}>
                                    <PlusIcon className="w-4 h-4 mr-1" />
                                    {t("sections.socials.add")}
                                </button>
                            </div>

                            <div className="space-y-3">
                                {form.socials.map((s) => (
                                    <div key={s.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                                        <select
                                            className="select select-bordered md:col-span-3"
                                            value={s.platform}
                                            onChange={(e) => updateSocial(s.id, { platform: e.target.value as SocialPlatform })}
                                        >
                                            {platformOptions.map((opt) => (
                                                <option key={opt.key} value={opt.value}>
                                                    {t(`sections.socials.platforms.${opt.value}`)}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            className="input input-bordered md:col-span-4"
                                            placeholder={t("sections.socials.labelPlaceholder") as string}
                                            value={s.label ?? ""}
                                            onChange={(e) => updateSocial(s.id, { label: e.target.value })}
                                        />
                                        <input
                                            className="input input-bordered md:col-span-4"
                                            placeholder={t("sections.socials.urlPlaceholder") as string}
                                            value={s.url}
                                            onChange={(e) => updateSocial(s.id, { url: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-ghost text-error md:col-span-1"
                                            onClick={() => removeSocial(s.id)}
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                                {form.socials.length === 0 && (
                                    <p className="text-sm text-gray-400">{t("sections.socials.empty")}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    {/* Hero image (optional) */}
                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body space-y-4">
                            <h2 className="card-title">{t("sections.hero.title")}</h2>
                            <div className="space-y-3">
                                <div className="w-full rounded-xl overflow-hidden border border-base-300">
                                    <Image
                                        src={heroPreview}
                                        alt="hero"
                                        width={720}
                                        height={320}
                                        style={{ width: "100%", height: "auto" }}
                                    />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                    onChange={(e) => setHeroFile(e.target.files?.[0] ?? null)}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    placeholder={t("sections.hero.pathPlaceholder") as string}
                                    value={form.heroPath ?? ""}
                                    onChange={(e) => setForm((p) => ({ ...p, heroPath: e.target.value }))}
                                />
                                <p className="text-xs text-gray-400">{t("sections.hero.help")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast */}
            {toastOk && (
                <div className="toast toast-end">
                    <div className="alert alert-success">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span>{t("saved")}</span>
                    </div>
                </div>
            )}
        </form>
    );
}
