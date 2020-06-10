import Avatar from "@material-ui/core/Avatar";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Button from "@material-ui/core/Button";
import React from "react";
import Wallet from "../types/Wallet";
import {makeStyles, Theme} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from "@material-ui/core/CircularProgress";
import {updateWalletBalanceThunk} from "../redux/thunks/wallets";
import {Link} from "react-router-dom";
import {getCurrencyByWalletType, getTransactionListUrl, isRecoveryAvailable} from "../helpers/wallet";
import {setWallet} from "../redux/actions/wallet";

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
    },
    scroll: {
        overflowX: 'auto'
    },
    fixWidth: {
        maxWidth: '100%'
    }
}));

interface WalletCardProps {
    wallet: Wallet,
    dispatch: (arg0: any) => void
}

const WalletCard = ({wallet, dispatch}: WalletCardProps) => {
    const classes = useStyles();
    const handleCheckBalance = () => {
        if (!wallet.state.getBalanceForm.isSubmitting) {
            dispatch(updateWalletBalanceThunk(wallet.walletType, wallet.publicAddress))
        }
    };

    const handleExpandClick = () => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                isListingTabOpen: !wallet.state.isListingTabOpen
            }
        }))
    };

    return <Paper className={clsx(classes.card, classes.fixWidth)} elevation={2}>
        <Grid container justify={"space-between"} alignItems={"center"} className={classes.fixWidth}>
            <Grid item xs={12} md={"auto"}>
                <Grid container alignItems={"center"} className={clsx(classes.scroll, classes.fixWidth)}
                      wrap={"nowrap"}>
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
            <Grid item xs={12} md={"auto"}>
                <Grid container justify={"flex-end"}>
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
                                [classes.expandOpen]: wallet.state.isListingTabOpen,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={wallet.state.isListingTabOpen}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Collapse in={wallet.state.isListingTabOpen} timeout="auto" unmountOnExit>
            <Grid container>
                <Grid item>
                    <Button variant={"contained"} className={classes.button}
                            onClick={handleCheckBalance}>
                        Check balance
                        {wallet.state.getBalanceForm.isSubmitting && <CircularProgress size={24}/>}
                        {!wallet.state.getBalanceForm.isSubmitting && wallet.state.getBalanceForm.wasSubmitted && wallet.state.getBalanceForm.isSuccess &&
                        <CheckCircleIcon/>}
                        {!wallet.state.getBalanceForm.isSubmitting && wallet.state.getBalanceForm.wasSubmitted && !wallet.state.getBalanceForm.isSuccess &&
                        <CancelIcon/>}
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} className={classes.button} component={Link}
                            to={`/transfer-founds/${wallet.walletType}/${wallet.publicAddress}`}>Transfer
                        founds</Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} className={classes.button}
                            target={'_blank'}
                            href={getTransactionListUrl(wallet.walletType, wallet.publicAddress)}>List
                        transactions</Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} className={classes.button} component={Link}
                            to={`/change-security-type/${wallet.walletType}/${wallet.publicAddress}`}>Change
                        security</Button>
                </Grid>
                {isRecoveryAvailable(wallet.walletSecurityType) && <Grid item>
                    <Button variant={"contained"} className={classes.button} component={Link}
                            to={`/recover-wallet/${wallet.walletType}/${wallet.publicAddress}`}>Recover</Button>
                </Grid>}
            </Grid>
        </Collapse>
    </Paper>
};

export default connect()(WalletCard);
