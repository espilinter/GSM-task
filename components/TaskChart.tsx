import useTaskStore from "@/store/taskStore";
import SuccessChart from "./SuccessChart";

const TaskChart = () => {
    const { completedTasks, pendingTasks } = useTaskStore();
    return (
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
    );
}

export default TaskChart;