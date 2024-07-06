'use client'

import TaskInput from '@/components/TaskInput'
import TaskChart from '@/components/TaskChart'
import CompletedTasks from '@/components/PendingTasks'
import PendingTasks from '@/components/CompletedTasks'
export default function Home() {

  return (
    <main className="flex flex-col items-center my-4 md:my-20 m-auto gap-8 max-w-[1024px] w-[calc(100%-32px)]">
      <div className='flex flex-col-reverse sm:flex-row gap-8 items-start w-full'>
        <TaskInput />
        <TaskChart />
      </div>
      <CompletedTasks />
      <PendingTasks />
    </main>
  )
}
