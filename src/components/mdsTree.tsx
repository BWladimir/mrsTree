import {Button, Tree, TreeDataNode} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {mdsTreeSlice} from "../store/reducers/mdsTree/mds.reducer";
import SelectedMds from "./selectedMds";
import { useState} from "react";
import RightClickModal, {IRightClickModalProps}from "./rightClickModal/rightClickModal";


export default function (){
    const mdsTree = useAppSelector(state => state.mdsTree)
    const [selectedNode, setSelectedNode] = useState<TreeDataNode | null>(null)
    const [rightClickModal, setRightClickModal] = useState<IRightClickModalProps | null>(null);
    const dispatch = useAppDispatch();


    return(
        <div>
            <div style={{display: "flex", gap: "1rem",}} className="App">
                <Tree {...{
                    showLine: true,
                    draggable: true,
                    showIcon: true,
                    onRightClick: ({event, node}) => {
                        setRightClickModal({
                            cord: {x: event.clientX, y: event.clientY},
                            node: node,
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
                    treeData: mdsTree.treeNode,
                    onSelect: (keys, event) => setSelectedNode(event.node),
                }}/>
                <SelectedMds {...{selectedMds: selectedNode, setSelectedMds: setSelectedNode}}/>
                {rightClickModal && <RightClickModal {...rightClickModal}/>}
            </div>
            <Button onClick={() => console.log(mdsTree.treeNode)}>Сохранить</Button>
        </div>

    )
}