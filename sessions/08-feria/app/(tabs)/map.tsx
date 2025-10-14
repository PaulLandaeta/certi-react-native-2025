import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Modal, Pressable, Platform, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import { VENDORS, ZONES } from "../../src/data/vendors";
import { Vendor } from "../../src/types";
import { CategoryChips } from "../../src/components/CategoryChips";
import { SearchBar } from "../../src/components/SearchBar";
import { VendorCard } from "../../src/components/VendorCard";
import { FloatingPanel } from "../../src/components/FloatingPanel";
import { Link } from "expo-router";


export default function MapScreen() {
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
        const t = setTimeout(() => mapRef.current?.fitToCoordinates(filtered.map(i => i.coords), { edgePadding: { top: 80, right: 80, bottom: 220, left: 80 }, animated: true }), 200);
        return () => clearTimeout(t);
    }, [filtered.length]);

    return (
        <View style={{ flex: 1 }}>
            <MapView ref={r => (mapRef.current = r)} style={{ flex: 1 }} provider={PROVIDER_GOOGLE} initialRegion={region} onRegionChangeComplete={setRegion} showsUserLocation showsMyLocationButton>
                {filtered.map(v => (
                    <Marker key={v.id} coordinate={v.coords} title={v.name} description={`${v.category} • ${v.zone ?? "Sin zona"}`} onPress={() => setSelected(v)} />
                ))}
            </MapView>


            <FloatingPanel>
                <Text style={ms.header}>Feria 16 de Julio</Text>
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
                <View style={ms.resultsRow}>
                    <Text style={ms.results}>{filtered.length} resultado(s)</Text>
                    <Pressable style={ms.btn} onPress={() => mapRef.current?.fitToCoordinates(filtered.map(i => i.coords), { edgePadding: { top: 80, right: 80, bottom: 220, left: 80 }, animated: true })}>
                        <Text style={ms.btnText}>Enfocar</Text>
                    </Pressable>
                </View>
            </FloatingPanel>
            {/* Hoja inferior de detalle (Modal) */}
            <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
                <Pressable style={ms.backdrop} onPress={() => setSelected(null)} />
                <View style={ms.modalCard}>
                    {selected && (
                        <>
                            <VendorCard v={selected} />
                            <Link href={{ pathname: "/vendor/[id]", params: { id: selected.id } }} asChild>
                                <Pressable style={[ms.btn, { alignSelf: "flex-end" }]}>
                                    <Text style={ms.btnText}>Ver más</Text>
                                </Pressable>
                            </Link>
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
}
const ms = StyleSheet.create({
    header: { fontSize: 18, fontWeight: "800", marginBottom: 4 },
    zoneRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 },
    zonePills: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    zonePill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: "#f4f4f5" },
    zonePillActive: { backgroundColor: "#111827" },
    zoneText: { fontSize: 12, color: "#111827" },
    zoneTextActive: { color: "white" },
    label: { fontSize: 13, color: "#374151" },
    resultsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
    results: { fontSize: 13, color: "#374151" },
    btn: { paddingHorizontal: 14, paddingVertical: 10, backgroundColor: "#111827", borderRadius: 10 },
    btnText: { color: "white", fontWeight: "700" },
    backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
    modalCard: { position: "absolute", left: 0, right: 0, bottom: 0, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, gap: 6 },
});