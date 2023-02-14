import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native"
import BackButton from "../components/BackButton";
import CheckBox from "../components/CheckBox";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

const avaliableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

const New = () => {
    const [weekDays, setWeekDays] = useState<number[]>([]);
    const handlesTogglerWeekDay = (weekDayIndex: number) => {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter((weekDay) => weekDay !== weekDayIndex));
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white border-2 border-zinc-600 focus:border-violet-600"
                    placeholder="Ex.: Exercicios, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                />
                <Text className="font-semibold text-white mt-4 mb-3 text-base">
                    Qual a recorrência?
                </Text>
                {
                    avaliableWeekDays.map((weekDay, index) => (
                        <CheckBox
                            key={weekDay}
                            title={weekDay}
                            checked={weekDays.includes(index)}
                            onPress={() => handlesTogglerWeekDay(index)}
                        />
                    ))
                }
                <TouchableOpacity
                    className="w-full h-14 flex-row items-center justify-center bg-violet-900 hover:bg-violet-700 rounded-3xl mt-6"
                    activeOpacity={0.7}
                >
                    <Feather
                        name='check'
                        size={20}
                        color={colors.white}
                    />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default New;