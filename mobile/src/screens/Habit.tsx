import { View, ScrollView, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import clsx from "clsx";
import dayjs from "dayjs";

import BackButton from "../components/BackButton";
import ProgressBar from "../components/ProgressBar";
import CheckBox from "../components/CheckBox";
import Loading from "../components/Loading";
import { api } from "../lib/axios";
import HabitsEmpty from "../components/HabitsEmpty";
import { GenerateProgressPercentage } from '../utils/generate-progress-percentage'

interface Params {
    date: string;
}
interface DayInfoProps {
    completedHabits: string[];
    possibleHabits: Array<{
        id: string;
        titles: string
    }>
}

const Habit = () => {
    const [loading, setLoading] = useState(true);
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
    const [completedHabits, setCompletedHabits] = useState<string[]>([]);
    const route = useRoute();
    const { date } = route.params as Params;
    const parsedDate = dayjs(date);
    const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
    const dayOfWeek = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM');
    const habitsProgress = dayInfo?.possibleHabits ? GenerateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

    const fetchHabit = async () => {
        setLoading(true);
        await api.get('/day', { params: { date } })
            .then((response) => {
                setDayInfo(response.data);
                setCompletedHabits(response.data.completedHabits);
            }).catch((error) => {
                console.log(error);
                Alert.alert('Ops!', 'Não foi possivel carregar as informações dos hábitos.');
            }).finally(() => {
                setLoading(false);
            })
    }

    const handleToggleHabit = async (habitId: string) => {
        if (completedHabits.includes(habitId)) {
            setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId));
        } else {
            setCompletedHabits(prevState => [...prevState, habitId]);
        }
        await api.patch(`/habits/${habitId}/toggle`)
            .then(() => { })
            .catch((error) => {
                console.log(error);
                Alert.alert('Ops!', 'Não foi possível atualizar o status do hábito.');
            });
    }

    useEffect(() => {
        fetchHabit();
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />
                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfWeek}
                </Text>
                <Text className="mt-6 text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>
                <ProgressBar progress={habitsProgress} />
                <View className={clsx("mt-6", {
                    ["opacity-50"]: isDateInPast
                })}>
                    {
                        dayInfo!.possibleHabits.length > 0 ?
                            dayInfo!.possibleHabits.map(habit => (
                                <CheckBox
                                    key={habit.id}
                                    title={habit.titles}
                                    checked={completedHabits.includes(habit.id)}
                                    onPress={() => handleToggleHabit(habit.id)}
                                    disabled={isDateInPast}
                                />
                            ))
                            : (
                                !isDateInPast &&
                                <HabitsEmpty />
                            )
                    }
                </View>
                {
                    isDateInPast &&
                    (
                        <Text className="text-white mt-10 text-center">
                            Você não pode editar hábitos de datas passadas.
                        </Text>
                    )
                }
            </ScrollView>
        </View>
    )
}

export default Habit;