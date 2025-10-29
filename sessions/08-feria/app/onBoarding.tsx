import React, { useCallback } from 'react';
import { Image, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { STEPS } from '../src/data/steps';
import { usePushNotifications } from '../src/lib/usePushNotifications';

export default function OnboardingScreen() {
    const router = useRouter();
    const { sendPushNotification } = usePushNotifications();
    const finish = useCallback(async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        console.info('[Onboarding] Tutorial completado, enviando a login.');

        console.log('Onboarding finished, navigating to login...');

        router.replace('/(auth)/login');
    }, [router]);

    return (
        <Onboarding
            // Pantallas
            pages={STEPS.map(s => ({
                backgroundColor: s.backgroundColor,
                image: s.image,
                title: s.title,
                subtitle: s.subtitle,
                titleStyles: { fontSize: 24, fontWeight: '700', color: '#111827', textAlign: 'center' },
                subTitleStyles: { fontSize: 16, color: '#4b5563', textAlign: 'center', lineHeight: 22 },
                imageContainerStyles: { paddingBottom: 24 },
            }))}

            // Textos
            skipLabel="Omitir"
            nextLabel="Siguiente"
            doneLabel="Empezar"

            // Estilos de los dots
            bottomBarHighlight={false}
            containerStyles={{ flex: 1 }}
            controlStatusBar={false}
            DotComponent={({ selected }) => (
                <Text
                    style={{
                        width: selected ? 20 : 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: selected ? '#f9738f' : '#e5e7eb',
                        marginHorizontal: 4,
                    }}
                />
            )}

            // Acciones
            onSkip={finish}
            onDone={finish}
        />
    );
}
