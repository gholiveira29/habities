import { FormEvent, useState } from 'react';
import { Check } from "phosphor-react"
import * as Checkbox from '@radix-ui/react-checkbox';

const availableWeekDays = [
    'Domingo',
    'Segunda-feria',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sabado'
]
const NewHabitForm = () => {
    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([]);
    const createNewHabit = (event: FormEvent) => {
        event.preventDefault();
    }
    const handleToggleWeekDays = (weekDay: number) => {
        if (weekDays.includes(weekDay)) {
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay);
            setWeekDays(weekDaysWithRemovedOne);
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay];
            setWeekDays(weekDaysWithAddedOne);
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>
            <input
                type="text"
                id="title"
                placeholder="Ex.: Excercícios, dormir bem, etc..."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                autoFocus
                onChange={event => setTitle(event.target.value)}
            />
            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>
            <div className="flex flex-col gap-2 mt-3">
                {
                    availableWeekDays.map((weekDay, index) => {
                        return (
                            <Checkbox.Root
                                key={weekDay}
                                className='flex items-center gap-3 group'
                                onCheckedChange={() => handleToggleWeekDays(index)}
                            >
                                <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-600 border-2 border-zinc-500 group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-green-600 '>
                                    <Checkbox.Indicator>
                                        <Check size={24} className='text-white' />
                                    </Checkbox.Indicator>
                                </div>
                                <span className='text-white leading-tight'>
                                    {weekDay}
                                </span>
                            </Checkbox.Root>
                        )
                    })
                }
            </div>
            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}
export default NewHabitForm