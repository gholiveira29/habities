import * as Popover from '@radix-ui/react-popover';
import ProgressBar from './ProgressBar';
import clsx from 'clsx';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface HabitDayProps {
    date: Date;
    completed?: number;
    amount?: number
}

const HabitDay = ({ completed = 0, amount = 0 }: HabitDayProps) => {
    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;
    return (
        <Popover.Root>
            <Popover.Trigger className={clsx('w-10 h-10 rounded-lg', {
                ' bg-zinc-700 boder-2 border-zinc-600': completedPercentage === 0,
                'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
                'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
                'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
                'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
                'bg-violet-500 border-violet-400': completedPercentage >= 80,
            })} />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-600 flex flex-col '>
                    <span className='font-semibold text-zinc-400'>segunda-feira</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>13/02</span>
                    <ProgressBar progress={completedPercentage} />
                    <div className='mt-6 flex flex-col gap-3'>
                        <Checkbox.Root className='flex items-center gap-3 group'>
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-600 border-2 border-zinc-500 group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-green-600 '>
                                <Checkbox.Indicator>
                                    <Check size={24} className='text-white' />
                                </Checkbox.Indicator>
                            </div>
                            <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>Beber 3L de agua</span>
                        </Checkbox.Root>
                    </div>
                    <Popover.Arrow height={8} width={16} className='fill-zinc-600' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
export default HabitDay;