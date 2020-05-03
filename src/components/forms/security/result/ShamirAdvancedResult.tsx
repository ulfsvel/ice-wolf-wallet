import React from "react";
import {ShamirAdvancedSecurityResult} from "../../../../types/Wallet";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from "@material-ui/core/Paper";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    table: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));

interface ShamirAdvancedResultProps {
    result: ShamirAdvancedSecurityResult
}

const ShamirAdvancedResult = ({result}: ShamirAdvancedResultProps) => {
    const classes = useStyles();

    return <React.Fragment>
        <TableContainer component={Paper} className={classes.table}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Parameter</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Total shares
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {result.totalShares}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Shares to rebuild
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {result.sharesToRebuild}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <TableContainer component={Paper} className={classes.table}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Share</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.shares.map((share: string) => (
                        <TableRow key={share}>
                            <TableCell component="th" scope="row">
                                {share}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </React.Fragment>
};

export default ShamirAdvancedResult;