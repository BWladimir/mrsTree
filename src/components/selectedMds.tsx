import React, {Dispatch} from "react";
import {Input, TreeDataNode} from "antd";
import {EventDataNode} from "antd/lib/tree"
import {useAppDispatch} from "../hooks/redux";
import {mdsTreeSlice} from "../store/reducers/mdsTree/mds.reducer";

export interface ISelectedMdsProps{
    selectedMds: TreeDataNode | null,
    setSelectedMds: Dispatch<TreeDataNode | null>
}

export default function ({selectedMds, setSelectedMds}: ISelectedMdsProps) {
    const dispatch = useAppDispatch()
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = {...selectedMds, title: e.target.value} as EventDataNode<TreeDataNode>
        setSelectedMds(newValue)
        dispatch(mdsTreeSlice.actions.changeNode(newValue))
    }

    if(!selectedMds)
        return null
    return(
        <div>
            <div>
                <Input{...{
                    value: typeof selectedMds.title === "string" ? selectedMds.title : "value",
                    onChange: onChangeHandler
                }}/>
            </div>
        </div>
    )
}