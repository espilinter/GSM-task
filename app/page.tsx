'use client'
import Image from 'next/image'
import trash from "@/public/images/trash.png"
import circle from "@/public/images/circle.png"
import fill from "@/public/images/fill.png"
import back from "@/public/images/return.png"
import { useRef, useState } from 'react'

export default function Home() {
  interface taskType {
    id: string;
    text: string;
    done: string;
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)
  const [tasks, setTasks] = useState<taskType[]>([])
  const [deleteItem, setDeleteItem] = useState<boolean>(false)
  const [count, setCount] = useState<number>(10)
  function addTask() {
    if (inputRef.current) {
      const object: taskType = { id: inputRef.current.value, text: inputRef.current.value, done: "false" }
      setTasks([...tasks, object])
    }
  }

  function taskDone(id: string) {
    let object = [...tasks]
    tasks.map((item, index) => {
      if (item.id === id) {
        object[index].done = "true";
      }
    })
    setTasks(object)
  }

  function taskNotDone(id: string) {
    let object = [...tasks]
    tasks.map((item, index) => {
      if (item.id === id) {
        object[index].done = "false";
      }
    })
    setTasks(object)
  }

  function deleteHandler(id: string) {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
    }
    let object = [...tasks]
    tasks.map((item, index) => {
      if (item.id === id) {
        object[index].done = "pending";
        setDeleteItem(true);
        let i = 10;
        intervalIdRef.current = setInterval(() => {
          i--
          setCount(i)
          console.log(deleteItem);
          if (i === 0) {
            object.splice(index, 1)
            setDeleteItem(false)
            if (intervalIdRef.current) {
              clearInterval(intervalIdRef.current)
            }
            i = 10
          }
        }, 1000)
      }
    })
    setTasks(object)
  }

  function clearHandler() {
    setDeleteItem(false)
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
    }
  }


  return (
    <main className="flex flex-col items-center my-20 m-auto gap-8 max-w-[1024px] w-full">
      <div className='flex flex-row gap-8 items-start w-full'>
        <div className='flex border rounded-lg flex-col gap-4 p-3 w-[calc(66%-16px)]'>
          <span className='text-lg font-bold'>افزودن تسک جدید</span>
          <div className='flex gap-2'>
            <input className='border border-neutral-400 rounded-md p-1 w-full' placeholder='امروز میخوام...' ref={inputRef} />
            <button className='rounded-md bg-purple-900 px-4 py-1 text-white' onClick={addTask}>افزودن</button>
          </div>
        </div>
        <div className='flex border rounded-lg flex-col gap-4 p-3 w-[calc(33%-16px)]'>
          <span className='text-base font-bold'>گزارش موفقیت</span>
        </div>
      </div>
      <div className='flex border rounded-lg flex-col gap-4 p-3 w-full'>
        <span className='text-lg font-bold'>درحال انجام</span>
        <div className='flex flex-col'>
          {tasks.map((item) => (
            <div className={`flex justify-between items-center [&:not(:last-child)]:border-b p-3 ${item.done === "true" ? "hidden" : ""}`}>
              <div className='flex gap-2 items-center' onClick={() => { taskDone(item.id) }}>
                <Image className='' src={circle} alt='circle icon' width={16} height={16} />
                <span className=''>{item.text}</span>
              </div>
              <div className='rounded-[4px] border size-6 flex items-center justify-center' id={item.id} onClick={() => { deleteHandler(item.id) }}><Image src={trash} alt='trash icon' width={16} height={16} /></div>
            </div>
          ))}
          {/* <div className='flex justify-between items-center [&:not(:last-child)]:border-b p-3'>
            <div className='flex gap-2 items-center'>
              <Image className='' src={circle} alt='circle icon' width={16} height={16} />
              <span className=''>انجام تسک اول</span>
            </div>
            <div className='rounded-[4px] border size-6 flex items-center justify-center'><Image src={trash} alt='trash icon' width={16} height={16} /></div>
          </div>
          <div className='flex justify-between items-center [&:not(:last-child)]:border-b p-3'>
            <div className='flex gap-2 items-center'>
              <Image className='' src={circle} alt='circle icon' width={16} height={16} />
              <span className=''>انجام تسک اول</span>
            </div>
            <div className='rounded-[4px] border size-6 flex items-center justify-center'><Image src={trash} alt='trash icon' width={16} height={16} /></div>
          </div> */}
        </div>
        {deleteItem && <div className='bg-neutral-200 p-2 rounded-md flex items-center justify-between'>
          <p className='text-neutral-800 text-sm'>{count} ثانیه برای بازگرداندن فرصت دارید</p>
          <div className='bg-neutral-400 rounded-md p-1' onClick={clearHandler}><Image src={back} alt="return icon" width={14} height={14}></Image></div>
        </div>}
      </div>
      <div className='flex border rounded-lg flex-col gap-4 p-3 w-full'>
        <span className='text-lg font-bold'>انجام شده</span>
        <div className='flex flex-col'>
          {tasks.map((item) => (
            <div className={`flex justify-between items-center [&:not(:last-child)]:border-b p-3 ${item.done === "true" ? "" : "hidden"}`} onClick={() => { taskNotDone(item.id) }}>
              <div className='flex gap-2 items-center'>
                <Image className='' src={fill} alt='circle icon' width={16} height={16} />
                <span className=''>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
