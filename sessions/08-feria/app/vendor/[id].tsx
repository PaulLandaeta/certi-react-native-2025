import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { VENDORS, REVIEWS } from "../../src/data/vendors";
import { Vendor } from "../../src/types";
import { ImageCarousel } from "../../src/components/ImageCarousel";
import { Rating } from "../../src/components/Rating";
import { ReviewItem } from "../../src/components/ReviewItems";
import { ActionRow } from "../../src/components/ActionRow";
import { ScheduleBadge } from "../../src/components/ScheduleBadge";


export default function VendorDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const vendor: Vendor | undefined = useMemo(() => VENDORS.find(v => v.id === id), [id]);
    const vendorReviews = useMemo(() => REVIEWS.filter(r => r.vendorId === id), [id]);
    const avg = vendorReviews.length ? vendorReviews.reduce((a, b) => a + b.rating, 0) / vendorReviews.length : 0;


    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);


    if (!vendor) return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><Text>No encontrado</Text></View>;


    const submit = () => {
        // FRONTEND ONLY: aquí solo mostraríamos un alert o limpiaríamos el formulario.
        setComment("");
    };

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
            <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
                <Text style={st.title}>{vendor.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 6 }}>
                    <Rating value={avg || 5} />
                    <ScheduleBadge schedule={vendor.schedule} />
                </View>
                {!!vendor.tags?.length && <Text style={st.tags}>{vendor.tags.join(" • ")}</Text>}
            </View>


            <View style={{ marginTop: 10 }}>
                <ImageCarousel images={vendor.images} />
            </View>


            <View style={{ padding: 16, gap: 10 }}>
                {!!vendor.description && <Text style={{ fontSize: 15 }}>{vendor.description}</Text>}
                <ActionRow phone={vendor.phone} whatsapp={vendor.whatsapp} instagram={vendor.instagram} coords={vendor.coords} vendorName={vendor.name} />
            </View>


            {/* Reseñas */}
            <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
                <Text style={st.section}>Comentarios</Text>
                {vendorReviews.length === 0 ? (
                    <Text style={{ color: "#6b7280" }}>Sé el primero en opinar.</Text>
                ) : (
                    vendorReviews.map(r => <ReviewItem key={r.id} author={r.author} rating={r.rating} comment={r.comment} />)
                )}
            </View>
            {/* Formulario simple de reseña (solo frontend) */}
            <View style={{ padding: 16, gap: 8 }}>
                <Text style={st.section}>Deja tu comentario</Text>
                <View style={{ flexDirection: "row", gap: 6 }}>
                    {[1, 2, 3, 4, 5].map(n => (
                        <Pressable key={n} onPress={() => setRating(n)}>
                            <Text style={{ fontSize: 22 }}>{n <= rating ? "⭐" : "☆"}</Text>
                        </Pressable>
                    ))}
                </View>
                <TextInput
                    value={comment}
                    onChangeText={setComment}
                    placeholder="¿Qué te gustó? ¿Qué mejorarías?"
                    multiline
                    style={{ backgroundColor: "#f4f4f5", padding: 12, borderRadius: 12, minHeight: 80 }}
                />
                <Pressable onPress={submit} style={{ alignSelf: "flex-end", backgroundColor: "#111827", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 }}>
                    <Text style={{ color: "#fff", fontWeight: "800" }}>Publicar</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
const st = StyleSheet.create({
    title: { fontSize: 22, fontWeight: "800" },
    tags: { marginTop: 6, color: "#374151" },
    section: { fontSize: 16, fontWeight: "800", marginBottom: 6 },
});