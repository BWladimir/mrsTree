import {Modal, TreeDataNode} from "antd";
import {EventDataNode} from "antd/lib/tree"
import './rightClickModal.style.css'
import {Dispatch, MouseEventHandler, MutableRefObject, useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../hooks/redux";
import {mdsTreeSlice} from "../../store/reducers/mdsTree/mds.reducer";
import {IMdsTreeDataNode} from "../../store/reducers/mdsTree/mdsTree.model";

export type IRightClickModalProps = {
    cord: {x: number, y: number};
    node: EventDataNode<IMdsTreeDataNode>;
    setRightClickModal: Dispatch<IRightClickModalProps | null>;
}

export default function ({cord, node, setRightClickModal}: IRightClickModalProps){

    const dispatch = useAppDispatch();
    const ref:MutableRefObject<HTMLDivElement | null> = useRef(null)

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, []);

    const handleClickOutside = (e: MouseEvent) => {
        if (ref && ref.current && !ref.current.contains(e.target as Node)) {
            setRightClickModal(null)
        }
    }

    const onAddClick: MouseEventHandler = (e) => {
        dispatch(mdsTreeSlice.actions.addChild(node));
        setRightClickModal(null)
    }

    const onRemoveClick: MouseEventHandler = (e) => {
        dispatch(mdsTreeSlice.actions.removeNode(node));
        setRightClickModal(null)
    }

    return <div
        ref={ref}
        className={`right-click-modal`}
        style={{
            top: `${cord ? cord.y : 0}px`,
            left: `${cord ? cord.x : 0}px`
    }}
    >
        <div onClick={onAddClick}>Добавить</div>
        <div onClick={onRemoveClick}>Удалить</div>
        {/*<div>Еще что-то</div>*/}
    </div>
}