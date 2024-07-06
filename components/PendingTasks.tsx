import useTaskStore from "@/store/taskStore";
import Image from "next/image";
import { useRef, useState } from "react";
import back from "@/public/images/return.png"
import { taskType } from "@/types/taskType";
import trash from "@/public/images/trash.png"
import circle from "@/public/images/circle.png"
const PendingTasks = () => {
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null)
    const { pendingTasks, addCompletedTasks, addPendingTasks, removePendingTasks } = useTaskStore();
    const [deleteItem, setDeleteItem] = useState<boolean>(false)
    const [deletedItemData, setDeletedItemData] = useState<taskType>({ id: "", text: "" })
    const [count, setCount] = useState<number>(10)

    function taskDone(item: taskType) {
        addCompletedTasks(item)
        removePendingTasks(item.id)
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
    );
}

export default PendingTasks;