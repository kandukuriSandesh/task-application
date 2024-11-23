export interface TaskData {
    message:any;
    category:any;
    postedBy:any;
}
export interface TaskListProps {
    category: any
    message: string
    id: string
}

export const categories = [
    {name:"Others",value:"OTHERS"},
    {name:"Office",value:"OFFICE"},
    {name:"Home",value:"HOME"}
] as const;


export type Category = (typeof categories)[number]["value"];