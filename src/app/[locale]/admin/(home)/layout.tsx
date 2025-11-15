import React from "react";
import DrawerNavigation from "@/components/admin/DrawerNavigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <DrawerNavigation>
            {children}
        </DrawerNavigation>
    );
}
