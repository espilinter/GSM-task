import { taskType } from "@/types/taskType";

export interface Actions {
    completedTasks: taskType[],
    pendingTasks: taskType[],
    addCompletedTasks: (item: taskType) => void;
    addPendingTasks: (item: taskType) => void;
    removeCompletedTasks: (id: string) => void;
    removePendingTasks: (id: string) => void;
}
