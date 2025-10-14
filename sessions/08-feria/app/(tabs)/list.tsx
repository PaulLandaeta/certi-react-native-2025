import React, { useMemo, useState } from "react";
import { View, FlatList } from "react-native";
import { VENDORS } from "../../src/data/vendors";
import { Vendor } from "../../src/types";
import { VendorCard } from "../../src/components/VendorCard";
import { CategoryChips } from "../../src/components/CategoryChips";
import { SearchBar } from "../../src/components/SearchBar";
import { useRouter } from "expo-router";


export default function VendorListScreen() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string>("Todos");
    const [zone, setZone] = useState<string>("");


    const data = useMemo(() => {
        const q = search.trim().toLowerCase();
        return VENDORS.filter(v => {
            const matchesText = !q || v.name.toLowerCase().includes(q) || v.description?.toLowerCase().includes(q);
            const matchesCat = category === "Todos" || v.category === category;
            const matchesZone = !zone || v.zone === zone;
            return matchesText && matchesCat && matchesZone;
        });
    }, [search, category, zone]);


    return (
        <View style={{ flex: 1, padding: 12, gap: 8 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nombre o descripción..." />
            <CategoryChips value={category} onChange={setCategory} />
            <FlatList
                data={data}
                keyExtractor={(v: Vendor) => v.id}
                renderItem={({ item }) => (
                    <VendorCard
                        v={item}
                        onPress={() => router.push({ pathname: "/vendor/[id]", params: { id: item.id } })}
                    />
                )}
            />
        </View>
    );
}
