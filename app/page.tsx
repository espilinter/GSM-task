'use client'
import Image from 'next/image'
import trash from "@/public/images/trash.png"
import circle from "@/public/images/circle.png"
import fill from "@/public/images/fill.png"
import back from "@/public/images/return.png"
import { useRef, useState } from 'react'
import SuccessChart from '@/components/SuccessChart/SuccessChart'
import useTaskStore from '@/store/taskStore'
export default function Home() {
  interface taskType {
    id: string;
    text: string;
  }

  const { completedTasks, pendingTasks, addCompletedTasks, addPendingTasks, removeCompletedTasks, removePendingTasks } = useTaskStore();
  const inputRef = useRef<HTMLInputElement>(null)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)
  const [deleteItem, setDeleteItem] = useState<boolean>(false)
  const [deletedItemData, setDeletedItemData] = useState<taskType>({ id: "", text: "" })
  const [count, setCount] = useState<number>(10)

  function addTask() {
    if (inputRef.current) {
      const object: taskType = { id: `${Date.now()}`, text: inputRef.current.value }
      addPendingTasks(object)
      inputRef.current.value = "";
    }
  }

  function taskDone(item: taskType) {
    addCompletedTasks(item)
    removePendingTasks(item.id)
  }

  function taskNotDone(item: taskType) {
    addPendingTasks(item)
    removeCompletedTasks(item.id)
  }

  function deleteHandler(item: taskType) {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
    }
    setDeletedItemData(item)
    removePendingTasks(item.id)
    setDeleteItem(true);
    setCount(10)
    let i = 10;
    intervalIdRef.current = setInterval(() => {
      i--
      setCount(i)
      if (i < 1) {
        setDeleteItem(false)
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current)
        }
      }
    }, 1000)
  }

  function clearHandler() {
    setDeleteItem(false)
    addPendingTasks(deletedItemData)
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
    }
  }

  return (
    <main className="flex flex-col items-center my-20 m-auto gap-8 max-w-[1024px] w-[calc(100%-32px)]">
      <div className='flex flex-col-reverse sm:flex-row gap-8 items-start w-full'>
        <div className='flex border rounded-lg flex-col justify-between p-3 w-full sm:w-[calc(66%-16px)] h-[115px]'>
          <span className='text-lg font-bold'>افزودن تسک جدید</span>
          <div className='flex gap-2'>
            <input className='border border-neutral-400 rounded-md p-1 w-full' placeholder='امروز میخوام...' ref={inputRef} />
            <button className='rounded-md bg-purple-900 px-4 py-1 text-white' onClick={addTask}>افزودن</button>
          </div>
        </div>
        <div className='flex border rounded-lg flex-col gap-1 p-3 w-full sm:w-[calc(34%-16px)] h-[115px] min-w-[285px]'>
          <span className='text-base font-bold'>گزارش موفقیت</span>
          <div className='flex gap-4 items-end w-full'>
            <SuccessChart completed={completedTasks.length} pending={pendingTasks.length} />
            <div className='flex flex-col gap-1'>
              <span className='text-base font-bold'>{completedTasks.length} از {completedTasks.length + pendingTasks.length}</span>
              <span className=''>تسک انجام شده است</span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex border rounded-lg flex-col gap-4 p-3 w-full'>
        <span className='text-lg font-bold'>درحال انجام</span>
        <div className='flex flex-col'>
          {pendingTasks.map((item, index) => (
            <div className={`flex justify-between items-center [&:not(:last-child)]:border-b p-3`} key={item.id + "-" + index}>
              <div className='flex gap-2 items-center' onClick={() => { taskDone(item) }}>
                <Image className='' src={circle} alt='circle icon' width={16} height={16} />
                <span className=''>{item.text}</span>
              </div>
              <div className='rounded-[4px] border size-6 flex items-center justify-center' id={item.id} onClick={() => { deleteHandler(item) }}><Image src={trash} alt='trash icon' width={16} height={16} /></div>
            </div>
          ))}
        </div>
        {deleteItem && <div className='bg-neutral-200 p-2 rounded-md flex items-center justify-between'>
          <p className='text-neutral-800 text-sm'>{count} ثانیه برای بازگرداندن فرصت دارید</p>
          <div className='bg-neutral-400 rounded-md p-1' onClick={clearHandler}><Image src={back} alt="return icon" width={14} height={14}></Image></div>
        </div>}
      </div>
      <div className='flex border rounded-lg flex-col gap-4 p-3 w-full'>
        <span className='text-lg font-bold'>انجام شده</span>
        <div className='flex flex-col'>
          {completedTasks.map((item, index) => (
            <div className={`flex justify-between items-center [&:not(:last-child)]:border-b p-3`} onClick={() => { taskNotDone(item) }} key={item.id + "-" + index}>
              <div className='flex gap-2 items-center'>
                <Image className='' src={fill} alt='circle icon' width={16} height={16} />
                <span className='line-through'>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
