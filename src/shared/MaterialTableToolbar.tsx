import {Grid} from "@material-ui/core";
import {MTableToolbar} from "material-table";
import React from "react";

export const MaterialTableToolbar = props => {
    // Make a copy of props so we can hide the default title and show our own
    // This let's us use our own Title while keeping the search
    const propsCopy = {...props};
    // Hide default title
    propsCopy.showTitle = false;
    return (
        <Grid container direction="row">
            <Grid item xs={6}>
                <h4 style={{paddingLeft: '4px'}}>{propsCopy.title}</h4>
            </Grid>
            <Grid item xs={6}>
                <MTableToolbar {...propsCopy} />
            </Grid>
        </Grid>
    );
};
