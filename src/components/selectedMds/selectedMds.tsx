import React, {ChangeEventHandler, Dispatch, MouseEventHandler, useEffect, useRef, useState} from "react";
import {Button, Input} from "antd";
import {IMdsTreeDataNode} from "../../store/reducers/mdsTree/mdsTree.model";
import './selectedMds.style.css'
import {mdsTreeSlice} from "../../store/reducers/mdsTree/mds.reducer";
import {useAppDispatch} from "../../hooks/redux";
import {EventDataNode} from "antd/lib/tree";
export interface ISelectedMdsProps{
    selectedMds: EventDataNode<IMdsTreeDataNode>,
}

export default function ({selectedMds}: ISelectedMdsProps) {
    const dispatch = useAppDispatch();
    const [changed, setChanged] = useState<EventDataNode<IMdsTreeDataNode>>()

    useEffect(() => {
        if(selectedMds)
            setChanged({...selectedMds})
    }, [selectedMds])

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(changed)
        if(!e.target.id || !changed)
            return
        let newValue: EventDataNode<IMdsTreeDataNode>
        switch (e.target.id){
            case "title":
                newValue = {...changed, title: e.target.value}
                break
            case "wight":
                newValue = {...changed, additional: {...changed.additional, wight: +e.target.value}}
                break
            default:
                return;
        }
        setChanged(newValue)
    }

    const submit: MouseEventHandler<HTMLElement> = (e) => {
        if(changed)
            dispatch(mdsTreeSlice.actions.changeNode(changed));
    }

    const cansel: MouseEventHandler<HTMLElement> = (e) => {
        if(selectedMds)
            setChanged({...selectedMds})
    }

    if(!changed)
        return null
    return(
        <div className={"selected-mds-container"}>
            <div>
                № <strong>{changed.key.toString().split("-").join("")}</strong>
            </div>
            <div className={"selected-mds-form-container"}    onChange={ onChangeHandler }>
                <label htmlFor={"title"}>Название</label>
                <Input{...{
                    name: "title",
                    id: "title",
                    value: typeof changed.title === "string" ? changed.title : "value",
                }}/>
                <label htmlFor={"wight"}>Вес</label>
                <Input{...{
                    name: "wight",
                    id: "wight",
                    type: "number",
                    value: changed.additional.wight,
                }}/>
                <Button onClick={submit}>Сохранить</Button>
                <Button onClick={cansel}>Отмена</Button>
            </div>
        </div>
    )
}