import React, {forwardRef} from 'react';
import {
    ArrowUp,
    Check,
    ChevronLeft,
    ChevronRight,
    Close,
    DeleteOutline,
    DownloadOutline,
    FilterVariant,
    Magnify,
    Minus,
    PageFirst,
    PageLast,
    Pencil,
    PlusBox,
    ViewColumn
} from 'mdi-material-ui'
import {Icons} from "material-table";


export const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <PlusBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Close {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Pencil {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <DownloadOutline {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterVariant {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <PageFirst {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <PageLast {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Close {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Magnify {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowUp {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Minus {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};
