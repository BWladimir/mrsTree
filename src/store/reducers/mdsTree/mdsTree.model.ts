import {TreeDataNode} from "antd";
import {Key} from "react";
import {EventDataNode} from "antd/lib/tree";

export interface IMdsTree{
    selected: EventDataNode<IMdsTreeDataNode>[],
    treeNode: IMdsTreeDataNode[],
    expandedNode: Key[]
}

export interface IMdsTreeDataNode extends TreeDataNode{
    additional: {
        wight: number,
    }
    children?: IMdsTreeDataNode[]
}