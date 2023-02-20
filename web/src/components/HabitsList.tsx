import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import dayjs from 'dayjs';

interface HabitSListPros {
    date: Date,
    onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string;
        titles: string;
        created_at: string;
    }>,
    completedHabits: string[]
}

const HabitsList = ({ date, onCompletedChanged }: HabitSListPros) => {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
    useEffect(() => {
        api.get('/day', {
            params: {
                date: date.toISOString()
            }
        }).then((response) => {
            setHabitsInfo(response.data);
        })
    }, [])

    const IsDateInPast = dayjs(date).endOf('day').isBefore(new Date());
    const handleToggleHabit = async (habitId: string) => {
        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId);
        await api.patch(`/habits/${habitId}/toggle`);
        let completedHabits: string[] = [];

        if (isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }
        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits
        });
        onCompletedChanged(completedHabits.length);
    }

    return (
        <div className='mt-6 flex flex-col gap-3'>
            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root
                        key={habit.id}
                        className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        disabled={IsDateInPast}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                    >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-600 border-2 border-zinc-500 group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-green-600 transition-colors group-focus:ring-2 group-focus:ring-violet-800 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                            <Checkbox.Indicator>
                                <Check size={24} className='text-white' />
                            </Checkbox.Indicator>
                        </div>
                        <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>{habit.titles}</span>
                    </Checkbox.Root>
                )
            })}
        </div>
    )
}

export default HabitsList