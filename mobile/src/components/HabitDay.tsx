import { TouchableOpacity, TouchableOpacityProps, Dimensions } from "react-native";
import { GenerateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
    amountOfHabit?: number;
    amountCompleted?: number;
    date: Date;
}

const HabitDay = ({ amountOfHabit = 0, amountCompleted = 0, date, ...rest }: Props) => {
    const amountAcomplishedPercentage = amountOfHabit > 0 ? GenerateProgressPercentage(amountOfHabit, amountCompleted) : 0;
    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today);
    return (
        <TouchableOpacity className={clsx("rounded-lg border-2 m-1", {
            ["bg-zinc-600 border-zin-500"]: amountAcomplishedPercentage === 0,
            ["bg-violet-900 border-violet-700"]: amountAcomplishedPercentage > 0 && amountAcomplishedPercentage <= 20,
            ["bg-violet-800 border-violet-600"]: amountAcomplishedPercentage >= 20 && amountAcomplishedPercentage <= 40,
            ["bg-violet-700 border-violet-500"]: amountAcomplishedPercentage >= 40 && amountAcomplishedPercentage <= 60,
            ["bg-violet-600 border-violet-500"]: amountAcomplishedPercentage >= 60 && amountAcomplishedPercentage <= 80,
            ["bg-violet-500 border-violet-400"]: amountAcomplishedPercentage >= 80,
            ["border-slate-200 border-2"]: isCurrentDay
        })}
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={0.7}
            {...rest}
        />
    )
}

export default HabitDay;