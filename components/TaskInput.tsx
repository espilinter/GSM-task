import useTaskStore from "@/store/taskStore";
import { taskType } from "@/types/taskType";
import { useRef } from "react";

const TaskInput = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { addPendingTasks } = useTaskStore();
    function addTask() {
        if (inputRef.current) {
            const object: taskType = { id: `${Date.now()}`, text: inputRef.current.value }
            addPendingTasks(object)
            inputRef.current.value = "";
        }
    }
    return (
        <div className='flex border rounded-lg flex-col justify-between p-3 w-full sm:w-[calc(66%-16px)] h-[115px]'>
            <span className='text-lg font-bold'>افزودن تسک جدید</span>
            <div className='flex gap-2'>
                <input className='border border-neutral-400 rounded-md p-1 w-full' placeholder='امروز میخوام...' ref={inputRef} />
                <button className='rounded-md bg-purple-900 px-4 py-1 text-white' onClick={addTask}>افزودن</button>
            </div>
        </div>
    );
}

export default TaskInput;