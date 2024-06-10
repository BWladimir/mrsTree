import {Button, Tree, TreeDataNode, } from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {mdsTreeSlice} from "../store/reducers/mdsTree/mds.reducer";
import SelectedMds from "./selectedMds/selectedMds";
import React, {Key, useState} from "react";
import RightClickModal, {IRightClickModalProps}from "./rightClickModal/rightClickModal";
import {CarryOutOutlined, FileOutlined, FolderOutlined} from "@ant-design/icons";
import {IMdsTree, IMdsTreeDataNode} from "../store/reducers/mdsTree/mdsTree.model";
import {EventDataNode} from "antd/lib/tree";


export default function (){
    const mdsTree = useAppSelector(state => state.mdsTree)
    // const
    const [rightClickModal, setRightClickModal] = useState<IRightClickModalProps | null>(null);
    const dispatch = useAppDispatch();

    return(
        <div>
            <div style={{display: "flex", gap: "1rem",}} className="App">
                <Tree {...{
                    selectedKeys: mdsTree.selected.map(selectedNode => selectedNode.key),
                    expandedKeys: mdsTree.expandedNode,
                    showLine: true,
                    draggable: true,
                    showIcon: true,
                    onRightClick: ({event, node}) => {
                        setRightClickModal({
                            cord: {x: event.clientX, y: event.clientY},
                            node: node as EventDataNode<IMdsTreeDataNode>,
                            setRightClickModal: setRightClickModal
                        })
                    },
                    onDrop: (info) => {
                        const targetNodePosition = info.node.pos.split('-');
                        const movedPosition = info.dragNode.pos.split('-');
                        const dropPosition = info.dropPosition - +targetNodePosition[targetNodePosition.length - 1];
                        dispatch(mdsTreeSlice.actions.nodeMove({
                            targetNodePosition: targetNodePosition,
                            movedPosition: movedPosition,
                            position: dropPosition,
                        }))
                    },
                    // titleRender: (node) => node.title + " " + node.key,
                    treeData: loop(mdsTree.treeNode, node => {
                        if (!node.children || !node.children.length)
                            return {
                                ...node,
                                icon: <FileOutlined/>
                            }
                        return {
                            ...node,
                            icon: <FolderOutlined/>
                        }
                    }),
                    onSelect: (keys, event) => {
                        dispatch(mdsTreeSlice.actions.setSelected(event.node as EventDataNode<IMdsTreeDataNode>))
                    },
                    onExpand: (expandedKeys: Key[], info: { node: EventDataNode<TreeDataNode>, expanded: boolean, nativeEvent: MouseEvent}) => {
                        dispatch(mdsTreeSlice.actions.changeExpanded({
                            expandedKeys: expandedKeys, info: info
                        }))
                    }
                }}/>

                {mdsTree.selected.map(selectedNode =>
                    <SelectedMds {...{selectedMds: selectedNode}}/>
                )}
                {rightClickModal && <RightClickModal {...rightClickModal}/>}
            </div>
            {/*<Button onClick={() => console.log(mdsTree.treeNode)}>Сохранить</Button>*/}

        </div>
    )
}

function loop(tree: IMdsTreeDataNode[], callback: (elem: IMdsTreeDataNode) => IMdsTreeDataNode): IMdsTreeDataNode[]{
    const newTree: IMdsTreeDataNode[] = []
    for (const node of tree) {
        if(!node.children || !node.children.length){
            newTree.push(callback(node))
        }
        else
            newTree.push({...callback(node), children: loop(node.children, callback)})
    }
    return newTree
}