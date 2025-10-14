import { Vendor, Review } from "../types";


export const VENDORS: Vendor[] = [
{ id: "v1", name: "Doña Lidia - Anticuchos", category: "Comida", zone: "Tramo A", coords: { latitude: -16.5009, longitude: -68.1301 }, description: "Anticuchos y choclo con queso.", images: [
// puedes reemplazar por require("../../assets/xxx.jpg") si agregas imágenes locales
"https://images.unsplash.com/photo-1604908554007-0306b859b9b2",
"https://images.unsplash.com/photo-1526318472351-c75fcf070305"
], schedule: { sun: { open: "05:00", close: "18:00" } }, whatsapp: "59170000001", priceRange: "$", tags: ["anticuchos", "parrilla"] },
{ id: "v2", name: "ElectroNico", category: "Electrónica", zone: "Tramo B", coords: { latitude: -16.5015, longitude: -68.1292 }, description: "Cables, cargadores, powerbanks.", images: [
"https://images.unsplash.com/photo-1518779578993-ec3579fee39f"
], schedule: { sun: { open: "05:00", close: "18:00" } }, phone: "+59170000002", priceRange: "$$", tags: ["cables", "accesorios"] },
{ id: "v3", name: "Ropas Jacha", category: "Ropa", zone: "Tramo C", coords: { latitude: -16.5022, longitude: -68.131 }, description: "Abrigos y chompas de alpaca.", images: [
"https://images.unsplash.com/photo-1520975693416-35e41bd5cb31"
], schedule: { sun: { open: "05:00", close: "18:00" } }, instagram: "@ropasjacha", priceRange: "$$", tags: ["alpaca", "abrigos"] },
];


export const ZONES = Array.from(new Set(VENDORS.map(v => v.zone).filter(Boolean))) as string[];
export const CATEGORIES = ["Todos", "Comida", "Ropa", "Electrónica", "Juguetes", "Servicios", "Otros"] as const;


// reviews simuladas (frontend only)
export const REVIEWS: Review[] = [
{ id: "r1", vendorId: "v1", author: "Ana", rating: 5, comment: "Los mejores anticuchos 🔥", createdAt: new Date().toISOString() },
{ id: "r2", vendorId: "v1", author: "Luis", rating: 4, comment: "Buen sabor y atención.", createdAt: new Date().toISOString() },
];