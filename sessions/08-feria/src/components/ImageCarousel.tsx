import React from "react";
import { ScrollView, Image, View, StyleSheet, Dimensions } from "react-native";
export const ImageCarousel: React.FC<{ images?: string[] }>
    = ({ images }) => {
        if (!images || images.length === 0) return null;
        const w = Dimensions.get("window").width;
        return (
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }}>
                {images.map((uri, idx) => (
                    <View key={idx} style={{ width: w }}>
                        <Image source={{ uri }} style={ic.img} />
                    </View>
                ))}
            </ScrollView>
        );
    };
const ic = StyleSheet.create({ img: { width: "100%", height: 220, resizeMode: "cover" } });