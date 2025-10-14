import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Modal, Pressable, Platform, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import { VENDORS, ZONES } from "../data/vendors";
import { Vendor } from "../types";
import { CategoryChips } from "../components/CategoryChips";
import { SearchBar } from "../components/SearchBar";
import { VendorCard } from "../components/VendorCard";

export const MapScreen: React.FC = () => {
    const mapRef = useRef<MapView | null>(null);
    const [region, setRegion] = useState<Region>({ latitude: -16.5013, longitude: -68.1306, latitudeDelta: 0.01, longitudeDelta: 0.01 });
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string>("Todos");
    const [zone, setZone] = useState<string>("");
    const [selected, setSelected] = useState<Vendor | null>(null);
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") return;
            const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
            const next: Region = { latitude: loc.coords.latitude, longitude: loc.coords.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 };
            setRegion(next);
            mapRef.current?.animateToRegion(next, 800);
        })();
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return VENDORS.filter(v => {
            const matchesText = !q || v.name.toLowerCase().includes(q) || v.description?.toLowerCase().includes(q);
            const matchesCat = category === "Todos" || v.category === category;
            const matchesZone = !zone || v.zone === zone;
            return matchesText && matchesCat && matchesZone;
        });
    }, [search, category, zone]);


    useEffect(() => {
        if (!mapRef.current || filtered.length === 0) return;
        const t = setTimeout(() => mapRef.current?.fitToCoordinates(filtered.map(i => i.coords), { edgePadding: { top: 80, right: 80, bottom: 200, left: 80 }, animated: true }), 250);
        return () => clearTimeout(t);
    }, [filtered.length]);
    return (
        <View style={{ flex: 1 }}>
            <MapView ref={r => (mapRef.current = r)} style={{ flex: 1 }} provider={PROVIDER_GOOGLE} initialRegion={region} onRegionChangeComplete={setRegion} showsUserLocation showsMyLocationButton>
                {filtered.map(v => (
                    <Marker key={v.id} coordinate={v.coords} title={v.name} description={`${v.category} • ${v.zone ?? "Sin zona"}`} onPress={() => setSelected(v)} />
                ))}
            </MapView>


            {/* Panel superior de filtros */}
            <View style={ms.searchCard}>
                <Text style={ms.header}>Mapa Feria 16 de Julio</Text>
                <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nombre o descripción..." />
                <CategoryChips value={category} onChange={setCategory} />
                <View style={ms.zoneRow}>
                    <Text style={ms.label}>Zona:</Text>
                    <View style={ms.zonePills}>
                        {["Todas", ...ZONES].map(z => (
                            <Pressable key={z} onPress={() => setZone(z === "Todas" ? "" : z)} style={[ms.zonePill, (zone === z || (z === "Todas" && zone === "")) && ms.zonePillActive]}>
                                <Text style={[ms.zoneText, (zone === z || (z === "Todas" && zone === "")) && ms.zoneTextActive]}>{z}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
                <Text style={ms.results}>{filtered.length} resultado(s)</Text>
            </View>


            {/* Modal detalle */}
            <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
                <Pressable style={ms.backdrop} onPress={() => setSelected(null)} />
                <View style={ms.modalCard}>
                    {selected && <VendorCard v={selected} />}
                    {!!selected?.description && <Text style={{ fontSize: 14 }}>{selected.description}</Text>}
                    {!!selected?.hours && <Text style={{ fontSize: 13, color: "#6b7280" }}>Horario: {selected.hours}</Text>}
                    <View style={{ height: 12 }} />
                    <Pressable style={ms.btn} onPress={() => setSelected(null)}>
                        <Text style={ms.btnText}>Cerrar</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
};

const ms = StyleSheet.create({
    searchCard: { position: "absolute", top: Platform.OS === "android" ? 30 : 10, left: 12, right: 12, backgroundColor: "#fff", borderRadius: 16, padding: 12, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, elevation: 4, gap: 8 },
    header: { fontSize: 18, fontWeight: "700" },
    zoneRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    zonePills: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    zonePill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: "#f4f4f5" },
    zonePillActive: { backgroundColor: "#111827" },
    zoneText: { fontSize: 12, color: "#111827" },
    zoneTextActive: { color: "white" },
    label: { fontSize: 13, color: "#374151" },
    results: { fontSize: 13, color: "#374151" },
    backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
    modalCard: { position: "absolute", left: 0, right: 0, bottom: 0, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, gap: 6 },
    btn: { alignSelf: "flex-end", paddingHorizontal: 14, paddingVertical: 10, backgroundColor: "#111827", borderRadius: 10 },
    btnText: { color: "white", fontWeight: "600" },
});