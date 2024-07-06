import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { taskType, Actions } from './taskStoreType'
const taskStore = (set: any) => ({
    completedTasks: [] as taskType[],
    pendingTasks: [] as taskType[],
    addCompletedTasks: (item: taskType) => {
        set((state: Actions) => ({
            completedTasks: [item, ...state.completedTasks]
        }))
    },
    addPendingTasks: (item: taskType) => {
        set((state: Actions) => ({
            pendingTasks: [item, ...state.pendingTasks]
        }))
    },
    removeCompletedTasks: (id: string) => {
        set((state: Actions) => ({
            completedTasks: state.completedTasks.filter((item: taskType) => item.id !== id)
        }))
    },
    removePendingTasks: (id: string) => {
        set((state: Actions) => ({
            pendingTasks: state.pendingTasks.filter((item: taskType) => item.id !== id)
        }))
    },
})

const useTaskStore = create<Actions>()(devtools(
    persist(taskStore, {
        name: "tasksLocal"
    })
))

export default useTaskStore