export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type DayHours = { open: string; close: string; } | null; // "HH:mm" 24h, null = cerrado
export type WeeklySchedule = Partial<Record<Weekday, DayHours>>;


export type Category = "Comida" | "Ropa" | "Electrónica" | "Juguetes" | "Servicios" | "Otros";
export type Vendor = {
id: string;
name: string;
category: Category;
zone?: string;
coords: { latitude: number; longitude: number };
description?: string;
schedule?: WeeklySchedule; // para mostrar Abierto/Cerrado
images?: string[]; // require() locales o URLs
phone?: string;
whatsapp?: string; // número con prefijo país, ej: 5917xxxxxx
instagram?: string; // @usuario o url
priceRange?: "$" | "$$" | "$$$";
tags?: string[]; // ej: ["anticuchos", "parrilla"]
};


export type Review = {
id: string;
vendorId: string;
author: string;
rating: 1 | 2 | 3 | 4 | 5;
comment: string;
createdAt: string; // ISO
};


export type Filters = { search: string; category: "Todos" | Category; zone: string };