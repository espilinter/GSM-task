import useTaskStore from "@/store/taskStore";
import fill from "@/public/images/fill.png"
import Image from "next/image";
import { taskType } from "@/types/taskType";
const CompletedTasks = () => {

    const { completedTasks, addPendingTasks, removeCompletedTasks } = useTaskStore();
    function taskNotDone(item: taskType) {
        addPendingTasks(item)
        removeCompletedTasks(item.id)
    }
    return (
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
    );
}

export default CompletedTasks;