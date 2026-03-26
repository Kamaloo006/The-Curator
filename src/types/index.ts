export type Priority = "Low" | "Medium" | "High";
export type Status = "Todo" | "In Progress" | "Completed";


export interface Task{
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: Priority;
    status: Status;
    category: string;
    createdAt: string;
}