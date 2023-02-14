import { View, Text, ScrollView } from "react-native";
import Header from "../components/Header";
import HabitDay from "../components/HabitDay";
import { DAY_SIZE } from "../components/HabitDay";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";
import { useNavigation } from "@react-navigation/native";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

const Home = () => {
    const { navigate } = useNavigation();
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
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => (
                            <HabitDay
                                key={date.toISOString()}
                                onPress={() => navigate('habit', { date: date.toISOString() })}
                            />
                        ))
                    }
                    {
                        amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                            <View key={i} className="bg-zinc-600 rounded-lg border-2 m-1 border-zinc-500 opacity-40"
                                style={{ width: DAY_SIZE, height: DAY_SIZE }}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Home;