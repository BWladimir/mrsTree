import {TreeDataNode} from "antd";
import {EventDataNode} from "antd/lib/tree"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMdsTree} from "./mdsTree.model";
import {Key} from "react";

const initialState: IMdsTree = {
    treeNode: [
        {
            title: 'parent',
            key: '0',
            // disabled: true,
            children: [
                {
                    title: 'parent',
                    key: '0-0',
                    children: [
                        {
                            title: 'child',
                            key: '0-0-0',
                            disableCheckbox: true,
                        },
                        {
                            title: 'child',
                            key: '0-0-1',
                        },
                        {
                            title: 'child',
                            key: '0-0-2',
                        },
                        {
                            title: 'child',
                            key: '0-0-3',
                        },
                    ],
                },
            ]
        },
    ]
}

export const mdsTreeSlice = createSlice({
    name: "mdsTree",
    initialState,
    reducers: {
        addChild: (state, action:PayloadAction<EventDataNode<TreeDataNode>>) => {
            const {elem} = findNode(state.treeNode, action.payload.pos.split('-'))
            if(!elem)
                return
            if(!elem.children)
                elem.children = []
            elem.children.push({key: getNewChildKey(elem.key, elem.children), title: "added"})
        },
        removeNode: (state, action:PayloadAction<EventDataNode<TreeDataNode>>) => {
            const {elem, node} = findNode(state.treeNode, action.payload.pos.split('-'))
            if(!elem || !node)
                return
            node.splice( node.indexOf(elem), 1)

        },

        changeNode: (state, action: PayloadAction<EventDataNode<TreeDataNode>>) => {
            let {elem} = findNode(state.treeNode, action.payload.pos.split('-'))
            if(!elem)
                return
            Object.assign(elem, action.payload)
        },
        nodeMove: (
            state,
            action: PayloadAction<{
                targetNodePosition: string[],
                movedPosition: string[],
                position: number, // the drop position relative to the drop node, inside 0, top -1, bottom 1
            }>
        ) => {
            const {targetNodePosition, movedPosition, position} = action.payload

            const moved = findNode(state.treeNode, movedPosition)
            const target = findNode(state.treeNode, targetNodePosition)

            if(!target.node || !target.elem || !moved.node || !moved.elem) return

            moved.node.splice(+movedPosition[movedPosition.length - 1], 1)
            if(position){
                target.node.splice(
                    +targetNodePosition[targetNodePosition.length - 1] + +position,
                    0,
                    {
                        ...moved.elem,
                        key: getNewChildKey(
                            target.elem.key.toString().split("-").slice(0, -1).join("-"),
                            target.node,
                        )}
                )
            }
            else {
                if(!target.elem.children)
                    target.elem.children = []
                target.elem.children.unshift({...moved.elem, key: getNewChildKey(target.elem.key, target.elem.children)})
            }


        }

    },
})

const findNode = (tree: TreeDataNode[], position: string[]): {node: TreeDataNode[] | null, elem: TreeDataNode | null} => {
    let next: TreeDataNode[] = tree
    for (let i = 1; i < position.length - 1; i++) {
        if(!next[+position[i]] || !next[+position[i]].children)
            return {node: null, elem: null}
        next = next[+position[i]].children || []
    }
    const elemIndex = position.at(-1)
    return {
        node: next,
        elem: elemIndex ? next[+elemIndex] : null
    }
}

const getNewChildKey = (preKey: Key, elements: TreeDataNode[]): Key => {
    if(!elements.length){
        return preKey + "-0"
    }
    const keys = elements.map(v => {
        const keys = v.key.toString().split("-")
        return +keys[keys.length - 1]
    })
    return preKey + "-" + (Math.max(...keys) + 1)
}
export default mdsTreeSlice.reducer