import {TreeDataNode} from "antd";
import {EventDataNode} from "antd/lib/tree"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Key} from "react";
import {initialState} from "./mds.default"
import {IMdsTreeDataNode} from "./mdsTree.model";

export const mdsTreeSlice = createSlice({
    name: "mdsTree",
    initialState,
    reducers: {
        changeExpanded(state, action: PayloadAction<{expandedKeys: Key[], info: { node: EventDataNode<TreeDataNode>, expanded: boolean, nativeEvent: MouseEvent}}>) {
            if(action.payload.info.expanded){
                state.expandedNode = (action.payload.expandedKeys)
            }
            else{
                state.expandedNode = state.expandedNode.filter(node =>
                    !action.payload.expandedKeys.every(expandedKey => expandedKey !== node)
                )
            }
            console.log(state.expandedNode)
        },
        setSelected(state, action: PayloadAction<EventDataNode<IMdsTreeDataNode>>) {
            state.selected = [action.payload];
        },
        addChild: (state, action:PayloadAction<EventDataNode<IMdsTreeDataNode>>) => {
            const {elem} = findNode(state.treeNode, action.payload.pos.split('-'))
            if(!elem)
                return
            if(!elem.children)
                elem.children = []
            //@ts-ignore
            const newElem: EventDataNode<IMdsTreeDataNode> = {
                key: getNewChildKey(elem.key, elem.children),
                title: "added",
                additional: {wight: 0},
                pos: `${action.payload.pos}-${elem.children.length}`,
            }
            elem.children.push(newElem)
            state.selected = [{...newElem} as EventDataNode<IMdsTreeDataNode>]
            if(!state.expandedNode.some(node => node === action.payload.key))
                state.expandedNode.push(action.payload.key);
        },
        removeNode: (state, action:PayloadAction<EventDataNode<IMdsTreeDataNode>>) => {
            const {elem, node} = findNode(state.treeNode, action.payload.pos.split('-'))
            if(!elem || !node)
                return
            node.splice( node.indexOf(elem), 1)


        },
        changeNode: (state, action: PayloadAction<EventDataNode<IMdsTreeDataNode>>) => {
            let {elem} = findNode(state.treeNode, action.payload.pos.split('-'))
            if(!elem)
                return
            Object.assign(elem, action.payload)
        },
        nodeMove: (state, action: PayloadAction<{ targetNodePosition: string[], movedPosition: string[], position: number,}>) => {
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

const findNode = (tree: IMdsTreeDataNode[], position: string[]): {node: IMdsTreeDataNode[] | null, elem: IMdsTreeDataNode | null} => {
    let next: IMdsTreeDataNode[] = tree
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