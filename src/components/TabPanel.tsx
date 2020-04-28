import Grid, {GridProps} from "@material-ui/core/Grid";
import React from "react";

export interface TabPanelProps extends GridProps {
    value: number
    index: number
}

export default (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;

    return (
        <Grid item
              role="tabpanel"
              hidden={value !== index}
              {...other}
        >
            {value === index && children}
        </Grid>
    );
};