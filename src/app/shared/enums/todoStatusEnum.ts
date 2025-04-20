export enum TodoStatusEnum {
    TODO = 1,
    IN_PROGRESS = 2,
    COMPLETED = 3
}

export const TodoStatusLookUp = [
    {id:TodoStatusEnum.TODO,
    name: 'Baslanmadi'},

    {id:TodoStatusEnum.IN_PROGRESS,
    name: 'Devam ediyor'},

    {id:TodoStatusEnum.COMPLETED,
    name: 'Tamamlandi'}
]