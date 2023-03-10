import { View, Text, ScrollView, Alert } from "react-native";
import { useCallback, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";

import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";
import { api } from '../lib/axios';
import Header from "../components/Header";
import HabitDay from "../components/HabitDay";
import { DAY_SIZE } from "../components/HabitDay";
import Loading from "../components/Loading";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;
type SumarryProps = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number
}>

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<SumarryProps | null>(null);
    const { navigate } = useNavigation();
    const fetchData = async () => {
        await api.get('summary')
            .then((response) => {
                setLoading(true);
                setSummary(response.data);
            }).catch((error) => {
                console.info(error)
                Alert.alert('Ops!', 'Não foi possível carregar o sumario de hábitos.');
            }).finally(() => {
                setLoading(false);
            })
    }


    useFocusEffect(useCallback(() => {
        fetchData();
    }, []))

    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />
            <View className="flex-row  mt-6 mb-2">
                {
                    weekDays.map((weekday, index) => (
                        <Text key={`${weekDays}-${index}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{ width: DAY_SIZE }}
                        >
                            {weekday}
                        </Text>
                    ))
                }
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {
                    summary &&
                    <View className="flex-row flex-wrap">
                        {
                            datesFromYearStart.map(date => {
                                const dayWithHabits = summary.find(day => {
                                    return dayjs(date).isSame(day.date, 'day');
                                })
                                return (
                                    <HabitDay
                                        date={date}
                                        amountOfHabit={dayWithHabits?.amount}
                                        amountCompleted={dayWithHabits?.completed}
                                        key={date.toISOString()}
                                        onPress={() => navigate('habit', { date: date.toISOString() })}
                                    />
                                )
                            })
                        }
                        {
                            amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                                <View key={i} className="bg-zinc-600 rounded-lg border-2 m-1 border-zinc-500 opacity-40"
                                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                                />
                            ))
                        }
                    </View>}
            </ScrollView>
        </View>
    )
}

export default Home;