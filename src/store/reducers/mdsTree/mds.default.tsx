import {IMdsTree} from "./mdsTree.model";

export const initialState: IMdsTree = {
    selected: [],
    expandedNode: [],
    treeNode: [
        {
            "title": "Двигатель",
            key: "0",
            additional: {wight: 10},
            "children": [
                {
                    "title": "Поршни",
                    key: "0-0",
                    additional: {wight: 20},
                    "children": [
                        {
                            "title": "Кольца поршневые",
                            key: "0-0-0",
                            additional: {wight: 10},
                        },
                        {
                            "title": "Поршневой палец",
                            key: "0-0-1",
                            additional: {wight: 10},
                        }
                    ]
                },
                {
                    "title": "Коленчатый вал",
                    key: "0-1",
                    additional: {wight: 40},
                    "children": [
                        {
                            "title": "Шатуны",
                            key: "0-1-0",
                            additional: {
                                wight: 20
                            },
                        },
                        {
                            "title": "Подшипники коленчатого вала",
                            key: "0-1-1",
                            additional: {wight: 20},
                        }
                    ]
                },
                {
                    "title": "Головка блока цилиндров",
                    key: "0-2",
                    additional: {wight: 25},
                    "children": [
                        {
                            "title": "Клапаны",
                            key: "0-2-0",
                            additional: {wight: 15},
                            "children": [
                                {
                                    "title": "Прокладки клапанов",
                                    key: "0-2-0-0",
                                    additional: {wight: 10},
                                    children: [
                                        {
                                            title: "Паронит",
                                            key: "0-2-0-0-0",
                                            additional: {wight: 10},
                                        }
                                    ]
                                },
                                {
                                    "title": "Пружины клапанов",
                                    key: "0-2-0-1",
                                    additional: {wight: 5},
                                    children: [
                                        {
                                            title: "Сталь",
                                            key: "0-2-0-1-0",
                                            additional: {wight: 5},
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "Прокладки",
                            key: "0-2-1",
                            additional: {wight: 10},
                        }
                    ]
                }
            ]
        },
        {
            "title": "Трансмиссия",
            key: "1",
            additional: {wight: 40},
            "children": [
                {
                    "title": "Коробка передач",
                    key: "1-0",
                    additional: {wight: 20},
                    "children": [
                        {
                            "title": "Валы передач",
                            key: "1-0-0",
                            additional: {wight: 20},
                            "children": [
                                {
                                    "title": "Вал первичного вала",
                                    key: "1-0-0-0",
                                    additional: {wight: 10},
                                },
                                {
                                    "title": "Вал вторичного вала",
                                    key: "1-0-0-1",
                                    additional: {wight: 10},
                                }
                            ]
                        },
                        {
                            "title": "Сцепление",
                            key: "1-0-1",
                            additional: {wight: 20},
                            "children": [
                                {
                                    "title": "Диск сцепления",
                                    key: "1-0-1-0",
                                    additional: {wight: 10},
                                },
                                {
                                    "title": "Выжимной подшипник",
                                    key: "1-0-1-1",
                                    additional: {wight: 10},
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Привод",
                    key: "1-1",
                    additional: {wight: 20},
                    "children": [
                        {
                            "title": "Полуоси",
                            key: "1-1-0",
                            additional: {wight: 10},
                        },
                        {
                            "title": "Шрусы",
                            key: "1-1-1",
                            additional: {wight: 10},
                        }
                    ]
                }
            ]
        },
        {
            "title": "Ходовая часть",
            key: "2",
            additional: {wight: 37},
            "children": [
                {
                    "title": "Амортизаторы",
                    key: "2-0",
                    additional: {wight: 17},
                },
                {
                    "title": "Подвеска",
                    key: "2-1",
                    additional: {wight: 20},
                    "children": [
                        {
                            "title": "Пружины подвески",
                            key: "2-1-0",
                            additional: {wight: 10},
                        },
                        {
                            "title": "Шаровые опоры",
                            key: "2-1-1",
                            additional: {wight: 10},
                        }
                    ]
                }
            ]
        }
    ]
}
