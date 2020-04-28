import Avatar from "@material-ui/core/Avatar";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Button from "@material-ui/core/Button";
import React from "react";
import Wallet, {WalletSecurityType, WalletType} from "../types/Wallet";
import {makeStyles, Theme} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        width: "100%",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    iconAndAddress: {
        margin: theme.spacing(1),
    },
    balanceAndDropdown: {
        margin: theme.spacing(1),
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    icon: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    button: {
        margin: theme.spacing(1)
    }
}));

const getCurrencyByWalletType = (walletType: WalletType): string => {
    switch (walletType) {
        case WalletType.BTC:
            return "SAT";
        case WalletType.ETH:
            return "WEI"
    }
};

const isRecoveryAvailable = (walletSecurityType: WalletSecurityType): boolean => {
    return walletSecurityType === WalletSecurityType.ShamirBasic;
};

interface WalletCardProps {
    wallet: Wallet
}

export default ({wallet}: WalletCardProps) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return <Paper className={classes.card} elevation={2}>
        <Grid container justify={"space-between"} alignItems={"center"}>
            <Grid item>
                <Grid container alignItems={"center"}>
                    <Grid item className={classes.iconAndAddress}>
                        <Avatar className={classes.avatar}>
                            <AccountBalanceWalletIcon className={classes.icon}/>
                        </Avatar>
                    </Grid>
                    <Grid item className={classes.iconAndAddress}>
                        <Typography>
                            {wallet.publicAddress}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container alignItems={"center"}>
                    <Grid item className={classes.balanceAndDropdown}>
                        <Grid container direction={"column"} alignItems={"flex-end"}>
                            <Grid item>
                                {wallet.lastKnownBalance}
                            </Grid>
                            <Grid item>
                                {getCurrencyByWalletType(wallet.walletType)}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.balanceAndDropdown}>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Grid container>
                <Grid item>
                    <Button variant={"contained"} color={"primary"} className={classes.button}>Check balance</Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} color={"primary"} className={classes.button}>Transfer founds</Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} color={"primary"} className={classes.button}>List
                        transactions</Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} color={"primary"} className={classes.button}>Change security</Button>
                </Grid>
                {isRecoveryAvailable(wallet.walletSecurityType) && <Grid item>
                    <Button variant={"contained"} color={"primary"} className={classes.button}>Recover</Button>
                </Grid>}
            </Grid>
        </Collapse>
    </Paper>
};