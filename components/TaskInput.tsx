import useTaskStore from "@/store/taskStore";
import { taskType } from "@/types/taskType";
import { ChangeEvent, useRef, useState } from "react";

const TaskInput = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<string>('')
    const { addPendingTasks } = useTaskStore();
    const persianRegex: RegExp = /^[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF\u0660-\u0669-\u0030-\u0039]*$/;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (persianRegex.test(e.target.value)) {
            setValue(e.target.value)
        }
    }

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
                <input className='border border-neutral-400 rounded-md p-1 w-full' placeholder='امروز میخوام...' ref={inputRef} onChange={handleChange} value={value} />
                <button className='rounded-md bg-purple-900 px-4 py-1 text-white' onClick={addTask}>افزودن</button>
            </div>
        </div>
    );
}

export default TaskInput;