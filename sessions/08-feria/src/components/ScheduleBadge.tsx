import React from "react";
import { View, Text } from "react-native";
import { WeeklySchedule } from "../types";
const toMinutes = (hhmm: string) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
export const ScheduleBadge: React.FC<{ schedule?: WeeklySchedule }>
    = ({ schedule }) => {
        if (!schedule) return null;
        const now = new Date();
        const day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][now.getDay()] as keyof WeeklySchedule;
        const cur = schedule[day];
        if (!cur) return <Tag text="Cerrado" color="#ef4444" />;
        const mins = now.getHours() * 60 + now.getMinutes();
        const open = toMinutes(cur.open); const close = toMinutes(cur.close);
        const isOpen = mins >= open && mins <= close;
        return <Tag text={isOpen ? `Abierto hasta ${cur.close}` : `Abre ${cur.open}`} color={isOpen ? "#10b981" : "#f59e0b"} />;
    };
const Tag: React.FC<{ text: string; color: string }>
    = ({ text, color }) => (
        <View style={{ alignSelf: "flex-start", backgroundColor: color, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>{text}</Text>
        </View>
    );