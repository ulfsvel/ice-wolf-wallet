import React from "react";
import Wallet, {PaperSecurityResult} from "../../../../types/Wallet";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from '@material-ui/core/TableContainer';
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    table: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));

interface PaperResultProps {
    wallet: Wallet
}

const PaperResult = ({wallet}: PaperResultProps) => {
    const classes = useStyles();

    if (wallet.state.changeSecurityType.result === null) {
        return null
    }
    const result = wallet.state.changeSecurityType.result as unknown as PaperSecurityResult;

    return <TableContainer component={Paper} className={classes.table}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Private key</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">
                        {result.privateKey}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
};

export default PaperResult;