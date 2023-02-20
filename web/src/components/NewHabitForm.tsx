import { FormEvent, useState } from 'react';
import { Check } from "phosphor-react"
import * as Checkbox from '@radix-ui/react-checkbox';
import { api } from '../../lib/axios';
import { notification } from 'antd';

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
    const [titles, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([]);


    const createNewHabit = async (event: FormEvent) => {
        event.preventDefault();
        if (!titles || weekDays.length === 0) {
            notification.open({
                message: 'Preencha os campos: TITULO e RECORRENCIA!',
                placement: 'topRight',
                className: 'rounded-xl w-full p-4 flex items-center justify-center gap-3 text-white font-semibold bg-yellow-400',
            });
            return;
        }
        await api.post('habits', {
            titles,
            weekDays
        }).then(() => {
            notification.open({
                message: 'Hábito criado com sucesso!!',
                placement: 'topRight',
                className: 'rounded-xl p-4 flex items-center justify-center gap-3 font-semibold bg-green-600',
            });
        }).catch((ex) => {
            notification.open({
                message: `${ex}`,
                placement: 'topRight',
                className: 'rounded-xl p-4 flex items-center justify-center gap-3 font-semibold bg-red-600',
            });
        });

        setTitle('');
        setWeekDays([]);
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
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:z-violet-800 focus:ring-offset-2 focus:ring-offset-zinc-900'"
                value={titles}
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
                                className='flex items-center gap-3 group  focus:outline-none'
                                checked={weekDays.includes(index)}
                                onCheckedChange={() => handleToggleWeekDays(index)}
                            >
                                <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-600 border-2 border-zinc-500 group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-green-600 transition-colors group-focus:ring-2 group-focus:ring-violet-800 group-focus:ring-offset-2 group-focus:ring-offset-background'>
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
            <button
                type="submit"
                className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-violet-600 hover:bg-violet-500 transition-colors">
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}
export default NewHabitForm