import React from "react";
import { View, Text } from "react-native";
import { Rating } from "./Rating";
export const ReviewItem: React.FC<{ author: string; rating: number; comment: string }>
    = ({ author, rating, comment }) => (
        <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "700" }}>{author}</Text>
                <Rating value={rating} />
            </View>
            <Text style={{ marginTop: 4 }}>{comment}</Text>
        </View>
    );