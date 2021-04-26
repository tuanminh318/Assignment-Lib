import React, { useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { DELETE_CATEGORY_ID, GET_ALL_CATEGORIES} from "../../api/apiService";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    paper: {
        width: '100%',
        margin: 'auto'
    },
    removeLink: {
        textDecoration: 'none'
    }
}));
export default function ListCategory() {
    const classes = useStyles();
    const [categories, setCategories] = useState({});
    const [checkDeleteCategory, setCheckDeleteCategory] = useState(false);
    const [close, setClose] = React.useState(false);
    useEffect(() => {
        GET_ALL_CATEGORIES(`categories`).then(item => setCategories(item.data))
        console.log(GET_ALL_CATEGORIES);
    }, [])

    const deleteCategoryID = (id) => {

        DELETE_CATEGORY_ID(`categories/${id}`).then(item => {
            console.log(item)
            if (item.data === 1) {
                setCheckDeleteCategory(true);
                setCategories(categories.filter(key => key.id !== id))
            }
        })
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {checkDeleteCategory && <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setClose(true);
                                        setCheckDeleteCategory(false)
                                    }}
                                >
                                    <CloseIcon fontSize="inherit"/>
                                </IconButton>
                            }
                        > Delete success</Alert>}
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {/*<TableCell>#</TableCell>*/}
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Modify</TableCell>
                                        <TableCell align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categories.length > 0 && categories.map((row) => (
                                        <TableRow key={row.id}>
                                            {/*<TableCell component="th" scope="row">{row.id}</TableCell>*/}
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">
                                                <Link to={`/edit/category/${row.id}`} className={classes.removeLink}>
                                                    <Button size="small" variant="contained"
                                                            color="primary">Edit</Button></Link>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button size="small" variant="contained" color="secondary"
                                                        onClick={() => deleteCategoryID(row.id)}>Remove</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );

}

